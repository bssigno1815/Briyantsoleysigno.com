// pages/api/transactions/create.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { saveTransaction } from "@/lib/db"; // your DB write
const ADMIN_API_KEY = process.env.ADMIN_API_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const tx = req.body;

  // HARD RULE: phone required
  if (!tx?.phone || !/^\+?[1-9]\d{7,14}$/.test(tx.phone))
    return res.status(400).json({ error: "Phone number is required (E.164)." });

  // save
  const saved = await saveTransaction(tx);

  // fire-and-forget notifications (don’t block the response)
  const notify = async () => {
    const msg = `BSS: New transaction\nVendor: ${tx.vendorName}\nAmount: ${tx.amount}\nPhone: ${tx.phone}\nID: ${saved.id}`;
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_API_KEY },
      body: JSON.stringify({
        subject: "New BSS Transaction",
        text: msg,
        to: process.env.ADMIN_EMAILS, // optional CSV
      }),
    });
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-sms`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_API_KEY },
      body: JSON.stringify({
        to: process.env.ADMIN_SMS_LIST, // CSV like +1305...,+1786...
        body: msg,
      }),
    });
  };
  notify().catch(() => { /* swallow, log in server */ });

  return res.status(200).json(saved);
}
