import { verifyRequest } from "../_verifyFirebase"; // from earlier step

export default async function handler(req, res) {
  try {
    const user = await verifyRequest(req);
    if (!["admin","superadmin"].includes(user.role)) return res.status(403).json({error:"Admins only"});

    if (req.method === "POST") {
      const { amount, vendorId, note, smsTo } = req.body || {};
      // TODO: save to Firestore under admin/transactions
      // await firestore.collection('admin').doc('meta').collection('transactions').add({...})

      // notify (email + sms) ↓
      await fetch(`${process.env.INTERNAL_BASE_URL}/api/admin/notify`, {
        method: "POST",
        headers: { "Content-Type":"application/json", Authorization: `Bearer ${req.headers.authorization?.split(' ')[1]||''}` },
        body: JSON.stringify({ amount, vendorId, note, smsTo })
      });

      return res.json({ ok:true });
    }

    if (req.method === "GET") {
      // TODO: read transactions list (admin/transactions)
      return res.json({ data: [] });
    }
    return res.status(405).end();
  } catch (e) {
    return res.status(401).json({ error: e.message });
  }
}
