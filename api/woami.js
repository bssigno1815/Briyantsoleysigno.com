import crypto from 'crypto';

export default function handler(req,res){
  const cookie = (req.headers.cookie||'').split(';').find(p=>p.trim().startsWith('bss_admin='));
  if(!cookie) return res.status(401).end();

  const token = cookie.split('=')[1];
  if(!verify(token, process.env.AUTH_SECRET)) return res.status(401).end();
  return res.status(200).json({ ok:true });
}

function verify(jwt, secret){
  const [h,b,s] = jwt.split('.');
  if(!h||!b||!s) return false;
  const expected = b64url(crypto.createHmac('sha256', secret).update(`${h}.${b}`).digest('base64'));
  if(expected !== s) return false;
  try{
    const body = JSON.parse(Buffer.from(b.replace(/-/g,'+').replace(/_/g,'/'),'base64').toString('utf8'));
    return typeof body.exp==='number' && body.exp > Math.floor(Date.now()/1000);
  }catch{ return false; }
}
function b64url(s){ return s.replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_'); }
