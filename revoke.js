import { adminDb } from "../../lib/admin";
import { requireRole } from "../../lib/admin";

export default async function handler(req,res){
  if (req.method !== "POST") return res.status(405).end();
  const auth = await requireRole(req,res,['super']); // super only
  if (!auth?.uid) return;

  const { uid } = req.body || {};
  if (!uid) return res.status(400).json({ ok:false, error:'uid required' });

  // Prevent a super from revoking themselves accidentally (optional but wise)
  if (uid === auth.uid) {
    return res.status(400).json({ ok:false, error:'Cannot revoke your own role' });
  }

  const roleSnap = await adminDb.doc(`roles/${uid}`).get();
  if (!roleSnap.exists) return res.status(200).json({ ok:true }); // nothing to do

  await adminDb.doc(`roles/${uid}`).delete();
  await adminDb.collection('audit').add({
    actorUid: auth.uid, actorRole: auth.role, action:'roles.revoke',
    target: { uid }, at: new Date()
  });
  res.status(200).json({ ok:true });
}
