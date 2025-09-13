import { useState } from "react";
import { FileCode, Copy } from "lucide-react";

export default function FilesPanel({ manifest = {} }) {
  const files = Object.keys(manifest || {});
  const [active, setActive] = useState(files[0] || null);

  if (!files.length) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(manifest[active] || "");
    } catch {}
  };

  return (
    <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileCode size={16} />
          <h3 className="text-sm font-medium">Generated Files</h3>
        </div>
        {active && (
          <button onClick={copy} className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Copy size={12} /> Copy
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="space-y-2">
          {files.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`w-full text-left text-xs px-3 py-2 rounded-md border transition ${
                active === f
                  ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300"
                  : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
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