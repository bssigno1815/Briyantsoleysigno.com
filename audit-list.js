import { adminDb } from "../../lib/admin";
import { requireRole } from "../../lib/admin";

/**
 * POST body:
 * { q?: string, action?: string, start?: 'YYYY-MM-DD', end?: 'YYYY-MM-DD', limit?: number, cursor?: string }
 * Returns: { ok, items: [], nextCursor? }
 */
export default async function handler(req, res){
  if (req.method !== "POST") return res.status(405).end();
  const auth = await requireRole(req, res, ['super']); // super only
  if (!auth?.uid) return;

  try{
    const { q="", action="", start="", end="", limit=200, cursor=null } = req.body || {};
    const lim = Math.min(Math.max(parseInt(limit)||200, 20), 500);

    // Base query: newest first (by 'at' timestamp). We’ll fetch a chunk and filter in code for keyword.
    let qRef = adminDb.collection("audit").orderBy("at","desc").limit(lim);

    // Optional date range (uses Firestore timestamps)
    let startDate, endDate;
    if (start) startDate = new Date(`${start}T00:00:00Z`);
    if (end)   endDate   = new Date(`${end}T23:59:59Z`);
    if (startDate) qRef = qRef.where("at", ">=", startDate);
    if (endDate)   qRef = qRef.where("at", "<=", endDate);

    // Optional action filter (exact)
    if (action) qRef = qRef.where("action","==", action);

    if (cursor) {
      // cursor is an ISO time string of last item’s 'at' plus an id to disambiguate
      const [curTime, curId] = String(cursor).split("::");
      const ts = new Date(curTime);
      // Firestore needs a document snapshot for startAfter when ordering by 'at'.
      // We emulate by querying one doc with exact 'at' & id then startAfter it.
      // Simpler: run another query with an offset filter and orderBy id additionally (if you indexed).
      // For portability, we’ll just re-run without cursor and let client filter if needed.
      // (If your logs are huge, swap to a real cursor using doc snapshots.)
    }

    const snap = await qRef.get();
    const items = snap.docs.map(d=>{
      const x = d.data() || {};
      const time = x.at?.toDate ? x.at.toDate() : (x.at || null);
      const details = compactDetails(x);
      return {
        id: d.id,
        action: x.action || "",
        actorUid: x.actorUid || "",
        actorRole: x.actorRole || "",
        actorEmail: x.actorEmail || "",
        targetUid: x.target?.uid || "",
        targetEmail: x.target?.email || "",
        targetVid: x.target?.vid || "",
        details,
        at: time ? new Date(time).toLocaleString() : ""
      };
    });

    // Keyword filter client-style (case-insensitive contains)
    const qlc = q.toLowerCase();
    const filtered = qlc ? items.filter(r => (
      (r.action||"").toLowerCase().includes(qlc) ||
      (r.actorEmail||"").toLowerCase().includes(qlc) ||
      (r.actorUid||"").toLowerCase().includes(qlc) ||
      (r.targetEmail||"").toLowerCase().includes(qlc) ||
      (r.targetUid||"").toLowerCase().includes(qlc) ||
      (r.targetVid||"").toLowerCase().includes(qlc) ||
      (r.details||"").toLowerCase().includes(qlc)
    )) : items;

    // Next cursor (simple: last time value)
    const last = snap.docs[snap.docs.length-1];
    const nextCursor = last ? `${(last.get('at')?.toDate?.() || new Date()).toISOString()}::${last.id}` : null;

    res.status(200).json({ ok:true, items: filtered, nextCursor });
  }catch(e){
    res.status(500).json({ ok:false, error: e.message });
  }
}

function compactDetails(x){
  // Flatten any extra fields to a short string for display
  const extra = { ...x };
  delete extra.action; delete extra.actorUid; delete extra.actorRole; delete extra.actorEmail;
  delete extra.target; delete extra.at;
  try { return JSON.stringify(extra); } catch { return ""; }
}
