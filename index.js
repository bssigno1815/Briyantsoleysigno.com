// functions/index.js
const functions = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

const SUPERADMINS = new Set([
  // put YOUR user UID(s) here (you can see it in Firebase Auth > Users)
  "YOUR_SUPERADMIN_UID"
]);

exports.setRole = functions.onCall(async (req) => {
  const caller = req.auth;
  if (!caller) throw new functions.https.HttpsError("unauthenticated", "Sign in");

  // Only superadmins may change roles
  if (!SUPERADMINS.has(caller.uid)) {
    throw new functions.https.HttpsError("permission-denied", "Superadmin only");
  }

  const { uid, role } = req.data || {};
  if (!uid || !["admin", "superadmin", null].includes(role)) {
    throw new functions.https.HttpsError("invalid-argument", "Bad input");
  }

  // null role means remove all role claims (demote to regular user)
  const claims = role ? { role } : {};
  await admin.auth().setCustomUserClaims(uid, claims);
  return { ok: true, uid, role };
});
