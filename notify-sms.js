// api/notify-sms.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { text, to } = await req.json?.() || req.body || {};
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const tok = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM;
    if (!sid || !tok || !from) return res.status(500).json({ ok:false, error:'Missing Twilio env vars' });

    const recipients = (to || process.env.ADMIN_SMS || '').split(',').map(s=>s.trim()).filter(Boolean);
    if (!recipients.length) return res.status(400).json({ ok:false, error:'No recipients' });

    const auth = Buffer.from(`${sid}:${tok}`).toString('base64');
    const results = [];
    for (const dest of recipients) {
      const params = new URLSearchParams({ To: dest, From: from, Body: text || 'BSS alert' });
      const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
        method:'POST',
        headers:{ 'Authorization':`Basic ${auth}`, 'Content-Type':'application/x-www-form-urlencoded' },
        body: params
      });
      results.push({ to: dest, ok: r.ok, status: r.status, resp: await r.text() });
    }
    res.status(200).json({ ok:true, results });
  } catch (e) { res.status(500).json({ ok:false, error:e.message }); }
}
