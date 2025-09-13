import { ListChecks } from "lucide-react";

export default function PlanPanel({ steps = [] }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <ListChecks size={16} />
        <h3 className="text-sm font-medium">Plan</h3>
      </div>
      <ol className="space-y-2 list-decimal list-inside text-sm text-gray-700 dark:text-gray-300">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </section>
  );
}