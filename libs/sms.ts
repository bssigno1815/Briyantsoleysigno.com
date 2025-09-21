import twilio from "twilio";

const sid = process.env.TWILIO_ACCOUNT_SID!;
const token = process.env.TWILIO_AUTH_TOKEN!;
const from = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(sid, token);

export async function notifyAdminsSMS(message: string) {
  const list = (process.env.ADMIN_SMS_LIST || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  await Promise.all(
    list.map(to =>
      client.messages.create({ to, from, body: message })
    )
  );
}
