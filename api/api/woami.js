import { requireRole } from "../lib/admin";
export default async function handler(req,res){
  const auth = await requireRole(req, res, ['admin','super']);
  if (!auth?.uid) return;
  res.status(200).json({ ok:true, role: auth.role, email: auth.email });
}
