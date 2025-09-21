export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = await readJson(req);
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = signToken({ sub: email }, process.env.AUTH_SECRET, 12 * 60 * 60); // 12h
    res.setHeader('Set-Cookie', cookie('bss_admin', token, 12 * 60 * 60));
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false, error: 'Invalid credentials' });
}

// --- helpers ---
function cookie(name, val, maxAgeSeconds){
  const base = [
    `${name}=${val}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Strict`,
    `Secure`,
    `Max-Age=${maxAgeSeconds}`
  ];
  return base.join('; ');
}

import crypto from 'crypto';
function signToken(payload, secret, expSeconds){
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const exp = Math.floor(Date.now()/1000) + expSeconds;
  const body = b64url(JSON.stringify({ ...payload, exp }));
  const sig = b64url(crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64'));
  return `${header}.${body}.${sig}`;
}
function b64url(s){ return Buffer.from(s).toString('base64').replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_'); }
async function readJson(req){
  const chunks=[]; for await (const c of req) chunks.push(c);
  try{ return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}'); }catch{ return {}; }
}
