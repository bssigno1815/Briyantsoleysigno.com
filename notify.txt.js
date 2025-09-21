export const config = { runtime: 'edge' };

async function sendEmail({ subject, text, html, to }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.EMAIL_FROM || 'no-reply@briyantsoleysigno.com';
  const list = (to || process.env.EMAIL_TO || '').split(',').map(s=>s.trim()).filter(Boolean);
  if (!apiKey) throw new Error('Missing SENDGRID_API_KEY');
  if (!list.length) throw new Error('No email recipients');

  const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method:'POST',
    headers:{ 'Authorization':`Bearer ${apiKey}`, 'Content-Type':'application/json' },
    body: JSON.stringify({
      personalizations:[{ to: list.map(e=>({ email:e })) }],
      from:{ email: from },
      subject: subject || 'BSS Notification',
      content:[
        { type:'text/plain', value: text || '' },
        { type:'text/html', value: html || `<pre>${(text||'').replace(/</g,'&lt;')}</pre>` }
      ]
    })
  });
  if (!resp.ok) throw new Error(await resp.text());
}

async function sendSMS({ text, to }) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const tok = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !tok || !from) throw new Error('Missing Twilio env vars');
  const list = (to || process.env.ADMIN_SMS || '').split(',').map(s=>s.trim()).filter(Boolean);
  if (!list.length) throw new Error('No SMS recipients');

  const auth = 'Basic ' + btoa(`${sid}:${tok}`);
  const paramsBase = { From: from, Body: text || 'BSS alert' };

  for (const dest of list) {
    const params = new URLSearchParams({ ...paramsBase, To: dest });
    const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method:'POST',
      headers:{ 'Authorization': auth, 'Content-Type':'application/x-www-form-urlencoded' },
      body: params
    });
    if (!r.ok) throw new Error(await r.text());
  }
}

export default async function handler(req) {
  if (req.method && req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  try {
    const body = await req.json().catch(()=> ({}));
    const subject = body.subject || 'BSS • Notification Test';
    const text = body.text || 'This is a test from /api/notify-test (email + SMS).';
    const html = body.html || `<strong>${text}</strong>`;

    await sendEmail({ subject, text, html, to: body.toEmail });
    await sendSMS({ text, to: body.toPhone });

    return Response.json({ ok:true });
  } catch (e) {
    return Response.json({ ok:false, error: e.message }, { status: 500 });
  }
}
