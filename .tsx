"use client";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useIsAdmin } from "@/lib/useIsAdmin";
import "@/lib/firebase";

export default function BackupsPage() {
  const { loading, isAdmin } = useIsAdmin();
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const auth = getAuth();

  async function refreshList() {
    const storage = getStorage();
    const root = ref(storage, "admin/backups");
    const res = await listAll(root);
    const rows: { name: string; url: string }[] = [];
    for (const item of res.items) {
      const url = await getDownloadURL(item);
      rows.push({ name: item.name, url });
    }
    rows.sort((a,b)=> (a.name < b.name ? 1 : -1)); // newest first if timestamped
    setFiles(rows);
  }

  async function ensureLogin() {
    if (!auth.currentUser) await signInWithPopup(auth, new GoogleAuthProvider());
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      setBusy(true);
      await ensureLogin();
      const storage = getStorage();
      const ts = new Date().toISOString().replace(/[:.]/g, "-");
      const key = `admin/backups/${ts}__${f.name.replace(/\s+/g, "_")}`;
      await uploadBytes(ref(storage, key), f, { contentType: f.type || "application/zip" });
      await refreshList();
      alert("Backup uploaded ✔");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  useEffect(() => { if (isAdmin) refreshList().catch(()=>{}); }, [isAdmin]);

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-10 text-white">Checking admin…</div>;
  if (!isAdmin) return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-white mb-3">Access denied</h1>
      <p className="text-orange mb-6">Only Super Admins can access backups.</p>
      <button
        className="px-4 py-2 rounded-lg bg-orange text-black border border-black"
        onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
      >Sign in with Google</button>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-white">Backups</h1>
        <div className="flex items-center gap-2">
          <button onClick={refreshList} className="px-3 py-2 rounded-xl bg-black text-orange border border-orange">Refresh</button>
          <button onClick={() => signOut(auth)} className="px-3 py-2 rounded-xl bg-black text-orange border border-orange">Sign out</button>
        </div>
      </div>

      <div className="rounded-2xl border border-orange p-4 bg-black mb-6">
        <label className="block text-white text-sm mb-2">Upload ZIP backup</label>
        <input type="file" accept=".zip,.tar,.gz,.7z" onChange={onUpload} disabled={busy}
               className="block w-full text-white file:bg-orange file:text-black file:border-0 file:px-3 file:py-2 file:rounded-md" />
        <p className="text-orange text-xs mt-2">Stored under <code>admin/backups/</code> in Firebase Storage (Super Admins only).</p>
      </div>

      <div className="grid gap-3">
        {files.length === 0 ? (
          <div className="text-white/80">No backups yet.</div>
        ) : files.map(f => (
          <div key={f.name} className="flex items-center justify-between rounded-2xl border border-orange p-3 bg-black">
            <div className="text-white text-sm truncate">{f.name}</div>
            <a href={f.url} target="_blank" className="px-3 py-1 rounded-lg bg-orange text-black border border-black">Download</a>
          </div>
        ))}
      </div>
    </div>
  );
}<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
  {images.map((src,i)=>(
    <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl border border-orange bg-black">
      <Image src={src} alt={`Fan ${i+1}`} width={800} height={600} className="w-full h-full object-cover" />
    </div>
  ))}
</div><div className="mb-4 inline-flex items-center gap-2 text-xs bg-black text-orange border border-orange rounded-lg px-3 py-2">
  <span>Repons otomatik: <strong>24 èdtan</strong></span>
</div>

<button
  type="submit"
  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm bg-orange text-black disabled:opacity-60"
>
  Voye
</button><div className="rounded-2xl p-4 border border-orange bg-black">
  <div className="flex items-center gap-4">
    {/* photo */}
    <div className="h-14 w-14 rounded-xl overflow-hidden border border-orange bg-black" />
    <div>
      <div className="text-white font-semibold">{name}</div>
      <div className="text-orange text-sm">{role}</div>
    </div>
  </div>
</div>import CommentsBox from "@/components/CommentsBox";
export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Modération Kòmantè</h1>
        <div className="grid gap-8">
          <div><h2 className="text-lg font-semibold mb-2">Dirijan</h2><CommentsBox contextKey="dirijan" moderationMode /></div>
          <div><h2 className="text-lg font-semibold mb-2">Fanatik</h2><CommentsBox contextKey="fanatik" moderationMode /></div>
        </div>
      </section>
    </main>
  );
}import CommentsBox from "@/components/CommentsBox";

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <CommentsBox contextKey="fanatik" allowAnonymous autoReply
          autoReplyFrom="BSS Team"
          autoReplyMessage="Mèsi pou kòmantè a! N ap tounen bò ou nan 24 èdtan."
        />
      </section>
    </main>
  );
}// components/IstwaSection.tsx
import { motion } from "framer-motion";

export default function IstwaSection() {
  const milestones = [
    {
      year: "2015",
      title: "Fondasyon Bann lan",
      desc: "Bann lan fèt nan [Kote] pa [Fondatè yo].",
    },
    {
      year: "2018",
      title: "Premye gwo sòti",
      desc: "Nou patisipe nan premye parad ofisyèl nou an, yon gwo viktwa pou kominote a.",
    },
    {
      year: "2023",
      title: "Renouvèlman logo ak sit entènèt",
      desc: "Nou lanse nouvo logo ofisyèl la ak premye platfòm dijital BSS.",
    },
  ];

  return (
    <section className="py-12 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-extrabold mb-6 text-neutral-900 dark:text-white">
          Istwa Bann Lan
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-10">
          Bann Briyant Solèy Signo 1815 se yon istwa kouraj, mizik, ak inite.
          Depi premye jou yo, nou toujou pote yon flanm ki klere nan kominote a.
        </p>

        <div className="border-l-2 border-amber-500 pl-6 space-y-8">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <h3 className="text-xl font-bold text-amber-600">
                {m.year} – {m.title}
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}import CommentsBox from "@/components/CommentsBox";

export default function FanatikPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-6 text-neutral-900 dark:text-white">
          Fanatik BSS
        </h1>

        {/* Kòmantè pou Fanatik yo + repons otomatik 24h */}
        <CommentsBox
          contextKey="fanatik"
          allowAnonymous
          autoReply
          autoReplyFrom="BSS Team"
          autoReplyMessage="Mèsi pou kòmantè a! N ap tounen bò ou nan 24 èdtan."
        />
      </section>
    </main>
  );
}import CommentsBox from "@/components/CommentsBox";

export default function CommentsAdmin() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Modération Kòmantè</h1>
        <CommentsBox contextKey="dirijan" moderationMode />
        <div className="h-8" />
        <CommentsBox contextKey="fanatik" moderationMode />
      </section>
    </main>
  );
}import CommitteeSection from "@/components/CommitteeSection";
// …
<CommitteeSection />import CommitteeSection from "@/components/CommitteeSection";
// …
<CommitteeSection />import CommitteeSection from "@/components/CommitteeSection";

export default function Page() {
  return (
    <>
      {/* lòt kontni ou yo… */}
      <CommitteeSection />
    </>
  );
}
