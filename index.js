/export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-500 to-black text-white">
      <h1 className="text-4xl font-extrabold mb-4 text-center">
        BRIYANT SOLÈY SIGNO 1815
      </h1>
      <p className="text-lg mb-8 text-center max-w-xl">
        Yon vizyon, yon mountain, yon limyè ki pap janm ka etenn.
      </p>
      <img
        src="/logo-bss.png"
        alt="BSS Logo"
        className="w-48 h-48 mb-6"
      />
      <div className="flex gap-4">
        <a
          href="/fanbase"
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Fanbase
        </a>
        <a
          href="/dirijan"
          className="bg-black hover:bg-gray-800 text-orange-400 px-6 py-3 rounded-lg font-semibold"
        >
          Dirijan
        </a>
      </div>
    </main>
  );
          } (root)
  index.html
  /admins
  /timachann
  /api
  /asset (or /assets)
  style.css (or /assets/style.css)// functions/index.js
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
