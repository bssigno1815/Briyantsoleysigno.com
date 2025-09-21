import { verifyRequest } from "../_verifyFirebase";
import nodemailer from "nodemailer";
import twilio from "twilio";

const mail = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.ADMIN_EMAIL_USER, pass: process.env.ADMIN_EMAIL_PASS } // app password
});
const sms = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export default async function handler(req, res) {
  try {
    const user = await verifyRequest(req);
    if (!["admin","superadmin"].includes(user.role)) return res.status(403).json({error:"Admins only"});

    const { amount, vendorId, note, smsTo } = req.body || {};
    const subject = `New Transaction • ${vendorId} • $${amount}`;
    const text = `By: ${user.uid}\nVendor: ${vendorId}\nAmount: $${amount}\nNote: ${note||"-"}`;

    // Email all admins
    await mail.sendMail({
      from: `"BSS Admin" <${process.env.ADMIN_EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL_LIST, // comma-separated list in Vercel env
      subject, text
    });

    // SMS (optional)
    if (smsTo) {
      await sms.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: smsTo,
        body: `BSS: ${subject}`
      });
    }
    res.json({ ok:true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
