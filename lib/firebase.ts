// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:        "PASTE_YOURS",
  authDomain:    "PASTE_YOURS",
  projectId:     "PASTE_YOURS",
  storageBucket: "PASTE_YOURS",
  messagingSenderId: "PASTE_YOURS",
  appId:         "PASTE_YOURS",
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
