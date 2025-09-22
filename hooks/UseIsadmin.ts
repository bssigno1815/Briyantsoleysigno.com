"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import "@/lib/firebase"; // asire init

export default function useIsAdmin() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    return onAuthStateChanged(auth, async (user) => {
      if (!user) { setIsAdmin(false); setLoading(false); return; }
      const ref = doc(db, "admins", user.uid);
      const snap = await getDoc(ref);
      setIsAdmin(snap.exists());
      setLoading(false);
    });
  }, []);
  return { loading, isAdmin };
}
