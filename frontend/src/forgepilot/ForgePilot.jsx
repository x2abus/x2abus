import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Github, Copy, Download } from "lucide-react";

function Header({ status }) {
  const color = status === "online" ? "bg-emerald-500" : status === "degraded" ? "bg-amber-500" : "bg-gray-400";
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/40 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-fuchsia-600 shadow ring-1 ring-black/10 grid place-items-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">ForgePilot</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Autonomous scaffold & simulation agent</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-blue-600 text-white shadow">
            <ShieldCheck size={14} /> Safe Mode
          </div>
          <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
            {status === "online" ? "Connected" : status === "degraded" ? "Degraded" : "Offline"}
          </span>
          <Link to="/" className="text-xs px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">Home</Link>
        </div>
      </div>
    </header>
  );
}

function ChatWindow({ messages, bottomRef }) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 h-[50vh] md:h-[60vh] overflow-y-auto bg-white/70 dark:bg-gray-900/50">
      {messages.map((m, i) => (
        <div key={i} className="mb-3">
          <div className="text-xs uppercase tracking-wide text-gray-500">{m.role}</div>
          <pre className="whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-800 rounded-md p-3 text-sm">{m.text}</pre>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function InputBox({ onSend, loading }) {
  const [value, setValue] = useState("");
  const submit = () => {
    const v = value;
    if (!v.trim()) return;
    setValue("");
    onSend(v);
  };
  return (
    <div className="mt-4 flex gap-2">
      <input
        className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
        placeholder="e.g., Create a Python CLI that greets the user"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        disabled={loading}
      />
      <button
        className={`px-4 py-2 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        onClick={submit}
        disabled={loading}
      >Send</button>
    </div>
  );
}

function PlanPanel({ steps = [] }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 p-4 shadow-sm">
      <div className="text-sm font-medium mb-3">Plan</div>
      <ol className="space-y-2 list-decimal list-inside text-sm text-gray-700 dark:text-gray-300">
        {steps.map((s, i) => (<li key={i}>{s}</li>))}
      </ol>
    </section>
  );
}

function FilesPanel({ manifest = {} }) {
  const files = Object.keys(manifest || {});
  const [active, setActive] = useState(files[0] || null);

  const copy = async () => {
    try { await navigator.clipboard.writeText(manifest[active] || ""); } catch {}
  };

  const downloadZip = async () => {
    const base = process.env.REACT_APP_BACKEND_URL;
    const r = await fetch(`${base}/api/forgepilot/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ manifest, project_name: "forgepilot_scaffold" })
    });
    const blob = await r.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `forgepilot_scaffold.zip`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!files.length) return null;
  return (
    <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">Generated Files</div>
        <div className="flex items-center gap-2">
          {active && (
            <button onClick={copy} className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Copy size={12} /> Copy
            </button>
          )}
          <button onClick={downloadZip} className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            <Download size={12} /> Download ZIP
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="space-y-2">
          {files.map((f) => (
            <button key={f} onClick={() => setActive(f)} className={`w-full text-left text-xs px-3 py-2 rounded-md border transition ${active === f ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300" : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-3 min-h-[220px]">
          <pre className="text-xs whitespace-pre-wrap break-words">{manifest[active] || "Select a file"}</pre>
        </div>
      </div>
    </section>
  );
}

export default function ForgePilot() {
  const [messages, setMessages] = useState([
    { role: "system", text: "Welcome to ForgePilot. Describe the project you want to scaffold." }
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [plan, setPlan] = useState([]);
  const [manifest, setManifest] = useState({});
  const [status, setStatus] = useState("unknown");
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    const ping = async () => {
      try {
        const base = process.env.REACT_APP_BACKEND_URL;
        const r = await fetch(`${base}/api/forgepilot/health`);
        const data = await r.json();
        setStatus(data?.ok ? "online" : "degraded");
      } catch { setStatus("offline"); }
    };
    ping();
  }, []);

  const send = async (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const base = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${base}/api/forgepilot/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text, session_id: sessionId })
      });
      const data = await res.json();
      setSessionId(data.session_id || sessionId);
      setPlan(Array.isArray(data.plan) ? data.plan : []);
      setManifest(data.scaffold_manifest || {});
      const responseText = [
        `Plan: ${Array.isArray(data.plan) ? data.plan.join(" → ") : "N/A"}`,
        `Template: ${data.summary?.template}`,
        `Files: ${(data.summary?.generated_files || []).join(", ")}`,
        `Simulated: git=${data.summary?.simulated_actions?.git?.ok}, http=${data.summary?.simulated_actions?.http?.status}, code=${data.summary?.simulated_actions?.code?.ok}`
      ].join("\n");
      setMessages((m) => [...m, { role: "agent", text: responseText }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "agent", text: "Error contacting backend." }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-50">
      <Header status={status} />
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold">ForgePilot</h1>
            <span className="text-xs text-gray-600 dark:text-gray-300">Mobile-friendly • Responsive</span>
          </div>
          <ChatWindow messages={messages} bottomRef={bottomRef} />
          <InputBox onSend={send} loading={loading} />
        </div>
        <div className="space-y-4">
          <PlanPanel steps={plan} />
          <FilesPanel manifest={manifest} />
        </div>
      </div>
    </div>
  );
}