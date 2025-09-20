// lib/admin.js
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: (process.env.FB_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
    }),
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();

export async function requireRole(req, res, allowed = ['admin','super']) {
  try {
    const hdr = req.headers.authorization || '';
    const token = (hdr.startsWith('Bearer ') ? hdr.slice(7) : null) || (req.cookies?.bss_session || null);
    if (!token) return res.status(401).json({ ok:false, error:'No token' });
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;
    const roleSnap = await adminDb.doc(`roles/${uid}`).get();
    const role = roleSnap.exists ? roleSnap.data().role : null;
    if (!role || !allowed.includes(role)) return res.status(403).json({ ok:false, error:'Insufficient role' });
    return { uid, role, email: decoded.email || null };
  } catch {
    return res.status(401).json({ ok:false, error:'Bad token' });
  }
}// lib/admin.js
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: (process.env.FB_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
    }),
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();

export async function requireRole(req, res, allowedRoles = ['admin','super']) {
  try {
    const authHeader = req.headers.authorization || '';
    const idToken = (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null)
      || (req.cookies?.bss_session || null);
    if (!idToken) return res.status(401).json({ ok:false, error:'No token' });

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const roleDoc = await adminDb.doc(`roles/${uid}`).get();
    const role = roleDoc.exists ? roleDoc.data().role : null;

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ ok:false, error:'Insufficient role' });
    }
    return { uid, role, email: decoded.email || null };
  } catch (e) {
    return res.status(401).json({ ok:false, error:'Bad token' });
  }
}
