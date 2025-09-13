export default function StatusBadge({ ok, label }) {
  const color = ok ? "bg-emerald-500" : "bg-rose-500";
  return (
    <div className="inline-flex items-center gap-2 text-xs">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  );
}