export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { to, subject, text } = req.body || {};

    // TODO: call your providers here (Brevo, Twilio, etc.)
    // await sendEmail({ to, subject, text });
    // await sendSms({ to, text });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
