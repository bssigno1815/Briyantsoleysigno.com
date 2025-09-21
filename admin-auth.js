<!-- /assets/js/admin-auth.js -->
<script type="module">
  import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
  const auth = window.firebaseAuth;

  const ADMIN_EMAILS = (window.BSS_ADMINS || []).map(e => e.toLowerCase());
  const SUPER_ADMIN  = (window.BSS_SUPER_ADMIN || "").toLowerCase(); // set this in firebase-init.js

  export function onUser(cb){ return onAuthStateChanged(auth, cb); }
  export function isAdmin(user){ return !!(user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase())); }
  export function isSuperAdmin(user){ return !!(user?.email && user.email.toLowerCase() === SUPER_ADMIN); }
  export function doSignOut(){ return signOut(auth); }
</script>
