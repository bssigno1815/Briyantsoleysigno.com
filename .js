// /api/contact.js  (Vercel Serverless Function)
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, error:"Method not allowed" });

  try {
    const { name, email, phone, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok:false, error:"Missing required fields" });
    }

    // transporter using Gmail App Password (not your normal password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,         // e.g. briyantsoleysigno1815@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // 16-char app password
      },
    });

    const adminTo = process.env.EMAIL_TO || process.env.GMAIL_USER;

    // email to you (admin inbox)
    await transporter.sendMail({
      from: `"BSS Website" <${process.env.GMAIL_USER}>`,
      to: adminTo,
      subject: `BSS Fan Message: ${subject || "No subject"}`,
      text: [
        `Name:   ${name}`,
        `Email:  ${email}`,
        `Phone:  ${phone || ""}`,
        `Subject:${subject || ""}`,
        "",
        `${message}`
      ].join("\n"),
    });

    // auto-reply to fan (optional but nice)
    await transporter.sendMail({
      from: `"BSS 1815" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Nou resevwa mesaj ou",
      text: "Mèsi! Briyant Solèy Signo 1815 resevwa mesaj ou. Nou ap pran kontak avè w talè konsa.",
    });

    res.status(200).json({ ok:true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, error: err.message });
  }
}
