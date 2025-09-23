if (typeof window === "undefined") return null; // nan component ki 100% client"use client";// components/CommentsBox.tsx
"use client";// components/CommentsBox.tsx
"use client";const dirijanData = [
  { role: "Prezidan",     name: "Archange", photo: "/dirijan/archange.jpg" },
  { role: "Super Admin",  name: "MAXIMAX",  photo: "/dirijan/maximax.jpg" },
  { role: "Super Admin",  name: "Cangé",    photo: "/dirijan/cange.jpg" },
  // add the rest…
];{ role: "Prezidan", name: "Archange", photoPath: "bss-assets/dirijan/archange.jpg" }export const DIRIJAN = [
  { role: "Prezidan", name: "Archange", photo: "/dirijan/archange.jpg" },
  // …
];const imgs = [
  "/fanbase/2025-09-23_fan_001.jpg",
  "/fanbase/2025-09-23_fan_002.jpg",
  // …all your fan pics
];const dirijanData = [
  { role: "Prezidan",     name: "Archange", photo: "/dirijan/archange.jpg" },
  { role: "Super Admin",  name: "MAXIMAX",  photo: "/dirijan/maximax.jpg" },
  { role: "Super Admin",  name: "Cangé",    photo: "/dirijan/cange.jpg" },
  // add the rest…
];{ role: "Prezidan", name: "Archange", photo: "/images/dirijan/archange.jpg" }
async function submitComment(e: React.FormEvent) {
  e.preventDefault();
  setError(null);
  setOk(false);

  const trimmed = message.trim();
  const name = displayName.trim();

  if (!trimmed || (!allowAnonymous && !name)) {
    setError("Tanpri ekri yon mesaj e mete non ou.");
    return;
  }

  try {
    setSubmitting(true);
    // 1) Sove kòmantè moun nan (an atant apwobasyon)
    await addDoc(collection(getFirestore(), "bss_comments"), {
      contextKey,
      displayName: name || "Anonim",
      role,
      message: trimmed,
      approved: false,
      createdAt: serverTimestamp(),
    } as BssComment);

    // 2) Repons otomatik vizib touswit
    await addDoc(collection(getFirestore(), "bss_comments"), {
      contextKey,
      displayName: "BSS Admin",
      role: "Sistèm",
      message: "Mèsi pou mesaj ou! N ap tounen avè w nan 24 èdtan.",
      approved: true,
      createdAt: serverTimestamp(),
    } as BssComment);

    setMessage("");
    setOk(true);
  } catch (err: any) {
    setError("Gen yon erè pandan anrejistreman.");
  } finally {
    setSubmitting(false);
  }
}
