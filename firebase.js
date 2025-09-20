// Put your project config here (client-side keys are OK for Firebase)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_ID.firebaseapp.com",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_ID.appspot.com",
  messagingSenderId: "SENDER",
  appId: "APP_ID"
};

(async function(){
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
  const { getAuth, onAuthStateChanged, signOut } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js');
  const { getFirestore, collection, addDoc, doc, getDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db   = getFirestore(app);

  window.bss = { app, auth, db, collection, addDoc, doc, getDoc, serverTimestamp, onAuthStateChanged, signOut };
})();
