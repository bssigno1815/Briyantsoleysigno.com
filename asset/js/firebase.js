<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

  // TODO: paste your Firebase web config
  const firebaseConfig = {
    apiKey: "YOUR_WEB_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  window.__firebase = { app, auth }; // expose for other pages
</script>
