export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { message, sessionId } = req.body || {};
  if (!message || !message.trim()) return res.status(400).json({ error: "Message is required" });

  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8010";
  try {
    const r = await fetch(`${base}/api/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: message, session_id: sessionId || null })
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to contact backend" });
  }
}