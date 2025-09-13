import { Sparkles, ShieldCheck, Github } from "lucide-react";

export default function Header({ status = "unknown" }) {
  const statusColor = status === "online" ? "bg-emerald-500" : status === "degraded" ? "bg-amber-500" : "bg-gray-400";
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/40 border-b border-gray-200 dark:border-gray-800">
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${statusColor}`} />
            <span>{status === "online" ? "Connected" : status === "degraded" ? "Degraded" : "Offline"}</span>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Github size={14} />
            <span>Star</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-blue-600 text-white shadow hover:bg-blue-700 transition">
            <ShieldCheck size={14} />
            <span>Safe Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
}