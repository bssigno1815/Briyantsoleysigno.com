import type { NextApiRequest, NextApiResponse } from "next";
import { notifyAdminsSMS } from "../../../lib/sms";

// OPTIONAL: Firestore save (remove if you don't use it)
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";

function initDb() {
  if (!getApps().length) {
    initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }
  return getFirestore();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, error:"Method Not Allowed" });

  try {
    const { projectId, projectName, contributorName, contributorPhone, amount, note } = req.body;

    // 1) Save record (optional)
    try {
      const db = initDb();
      await addDoc(collection(db, "contributions"), {
        projectId: projectId || null,
        projectName: projectName || null,
        contributorName,
        contributorPhone: contributorPhone || null,
        amount: Number(amount),
        note: note || "",
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      // continue even if DB save fails; we still text admins
      console.warn("DB save failed:", e);
    }

    // 2) SMS all admins
    const msg =
      `BSS: New contribution • ${projectName || "General"} • ` +
      `${contributorName || "Anonymous"} • $${Number(amount).toFixed(2)}` +
      (note ? ` • Note: ${note}` : "");
    await notifyAdminsSMS(msg);

    return res.status(200).json({ ok:true });
  } catch (err:any) {
    console.error(err);
    return res.status(500).json({ ok:false, error: err.message || "Server error" });
  }
      }
