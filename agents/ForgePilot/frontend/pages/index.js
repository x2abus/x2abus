import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import StatusBadge from "../components/StatusBadge";
import PlanPanel from "../components/PlanPanel";
import FilesPanel from "../components/FilesPanel";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", text: "Welcome to ForgePilot. Describe the project you want to scaffold." }
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [plan, setPlan] = useState([]);
  const [manifest, setManifest] = useState({});
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState("unknown");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Ping health to show header status
    const ping = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8010";
        const r = await fetch(`${base}/api/health`);
        const data = await r.json();
        setStatus(data?.ok ? "online" : "degraded");
      } catch {
        setStatus("offline");
      }
    };
    ping();
  }, []);

  const send = async (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId })
      });
      const data = await res.json();
      setSessionId(data.session_id || sessionId);
      setPlan(Array.isArray(data.plan) ? data.plan : []);
      setManifest(data.scaffold_manifest || {});
      setSummary(data.summary || {});

      const responseText = [
        `Plan: ${Array.isArray(data.plan) ? data.plan.join(" → ") : "N/A"}`,
        `Template: ${data.summary?.template}`,
        `Files: ${(data.summary?.generated_files || []).join(", ")}`,
        `Simulated: git=${data.summary?.simulated_actions?.git?.ok}, http=${data.summary?.simulated_actions?.http?.status}, code=${data.summary?.simulated_actions?.code?.ok}`
      ].join("\n");
      setMessages((m) => [...m, { role: "agent", text: responseText }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "agent", text: "Error contacting backend." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ForgePilot</title>
      </Head>
      <Layout status={status}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-semibold">ForgePilot</h1>
              <StatusBadge ok={status === "online"} label={status === "online" ? "Connected" : "Offline"} />
            </div>
            <ChatWindow messages={messages} bottomRef={bottomRef} />
            <InputBox onSend={send} loading={loading} />
          </div>
          <div className="space-y-4">
            <PlanPanel steps={plan} />
            <FilesPanel manifest={manifest} />
          </div>
        </div>
      </Layout>
    </>
  );
}