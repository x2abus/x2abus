export default function ChatWindow({ messages, bottomRef }) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 h-[60vh] overflow-y-auto bg-white/70 dark:bg-gray-900/50">
      {messages.map((m, i) => (
        <div key={i} className="mb-3">
          <div className="text-xs uppercase tracking-wide text-gray-500">{m.role}</div>
          <pre className="whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-800 rounded-md p-3">{m.text}</pre>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}