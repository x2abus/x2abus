import { useState } from "react";
import clsx from "clsx";

export default function InputBox({ onSend, loading }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const v = value;
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
        className={clsx(
          "px-4 py-2 rounded-md text-white",
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        )}
        onClick={submit}
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
}