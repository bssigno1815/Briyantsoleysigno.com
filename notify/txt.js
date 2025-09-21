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
        { type:'text/html', value: html || `<pre>${(text||'').replace(/
