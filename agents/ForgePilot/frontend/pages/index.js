import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", text: "Welcome to ForgePilot. Describe the project you want to scaffold." }
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      const summary = data.summary || {};
      const responseText = [
        `Plan: ${Array.isArray(data.plan) ? data.plan.join(" → ") : "N/A"}`,
        `Template: ${summary.template}`,
        `Files: ${(summary.generated_files || []).join(", ")}`,
        `Simulated: git=${summary.simulated_actions?.git?.ok}, http=${summary.simulated_actions?.http?.status}, code=${summary.simulated_actions?.code?.ok}`
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
      <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold mb-4">ForgePilot</h1>
          <ChatWindow messages={messages} bottomRef={bottomRef} />
          <InputBox onSend={send} loading={loading} />
        </div>
      </main>
    </>
  );
}