import { adminDb } from "../../lib/admin";
import { requireRole } from "../../lib/admin";

export default async function handler(req,res){
  if (req.method !== "POST") return res.status(405).end();
  const auth = await requireRole(req,res,['super']); // super only
  if (!auth?.uid) return;

  const { uid, email, role } = req.body || {};
  if (!uid || !email || !['admin','super'].includes(role)) {
    return res.status(400).json({ ok:false, error:'uid, email, role=admin|super required' });
  }

  const now = new Date();
  await adminDb.doc(`roles/${uid}`).set({ email, role, updatedAt: now, createdAt: now }, { merge:true });
  await adminDb.collection('audit').add({
    actorUid: auth.uid, actorRole: auth.role, action:'roles.assign',
    target: { uid, email, role }, at: now
  });
  res.status(200).json({ ok:true });
}
