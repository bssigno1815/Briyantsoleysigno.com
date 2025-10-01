// app/api/send-message/route.js  (App Router)
// OUSWA pages/api/send-message.js (Pages Router)
import twilio from "twilio";

export async function POST(req, res) {
  try {
    const data = await (req.json ? req.json() : new Promise(r => {
      let body = ""; req.on("data", c => body += c);
      req.on("end", () => r(JSON.parse(body || "{}")));
    }));
    const { to, body } = data;

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const msg = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886", // sandbox
      to: `whatsapp:${to}`,  // eg: whatsapp:+151621668494
      body
    });

    const payload = { sid: msg.sid, status: "ok" };
    return new Response(JSON.stringify(payload), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    const err = { status: "error", message: e?.message || "send failed" };
    return new Response(JSON.stringify(err), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

// Pages Router only:
// export default function handler(req, res) { ... menm lojik anwo a men ak req/res klasik ... }
