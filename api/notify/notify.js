export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method && req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const subject = body.subject || 'BSS Notification';
    const text = body.text || '';
    const html = body.html || `<pre>${text.replace(/</g,'&lt;')}</pre>`;
    const toList = (body.to || process.env.EMAIL_TO || '')
      .split(',').map(s=>s.trim()).filter(Boolean);

    if (!process.env.SENDGRID_API_KEY) {
      return Response.json({ ok:false, error:'Missing SENDGRID_API_KEY' }, { status: 500 });
    }
    if (!toList.length) {
      return Response.json({ ok:false, error:'No recipients' }, { status: 400 });
    }

    const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method:'POST',
      headers:{
        'Authorization':`Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        personalizations:[{ to: toList.map(e=>({ email:e })) }],
        from:{ email: (process.env.EMAIL_FROM || 'no-reply@briyantsoleysigno.com') },
        subject,
        content:[
          { type:'text/plain', value:text },
          { type:'text/html', value:html }
        ]
      })
    });

    if (!resp.ok) {
      const err = await resp.text();
      return Response.json({ ok:false, error:err }, { status: 500 });
    }
    return Response.json({ ok:true });
  } catch (e) {
    return Response.json({ ok:false, error:e.message }, { status: 500 });
  }
}
