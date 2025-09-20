// api/notify-email.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { subject, text, html, to } = await req.json?.() || req.body || {};
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) return res.status(500).json({ ok:false, error:'Missing SENDGRID_API_KEY' });

    const sendTo = (to || process.env.EMAIL_TO || '').split(',').map(s=>s.trim()).filter(Boolean);
    if (!sendTo.length) return res.status(400).json({ ok:false, error:'No recipients' });

    const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method:'POST',
      headers:{
        'Authorization':`Bearer ${apiKey}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        personalizations:[{ to: sendTo.map(e=>({ email:e })) }],
        from:{ email: (process.env.EMAIL_FROM || 'no-reply@briyantsoleysigno.com') },
        subject: subject || 'BSS Notification',
        content:[ { type:'text/plain', value: text || '' }, { type:'text/html', value: html || `<pre>${(text||'').replace(/</g,'&lt;')}</pre>` } ]
      })
    });

    if (!resp.ok) {
      const err = await resp.text();
      return res.status(500).json({ ok:false, error:err });
    }
    res.status(200).json({ ok:true });
  } catch (e) { res.status(500).json({ ok:false, error:e.message }); }
}
