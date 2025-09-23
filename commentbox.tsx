// components/CommentsBox.tsx (only color lines to replace)
<div className="mb-4 inline-flex items-center gap-2 text-xs bg-gradient-to-b from-[#0a0a0a] to-[#000] text-orange border border-orange rounded-lg px-3 py-2">...</div>

<h3 className="text-xl font-bold text-orange">Kòmantè ...</h3>

<form className="bg-gradient-to-b from-[#0a0a0a] to-[#000] border border-orange rounded-2xl p-4 mb-6">
  ...
  <input
    className="w-full rounded-xl border border-orange bg-gradient-to-b from-[#0a0a0a] to-[#000] px-3 py-2 text-sm outline-none text-orange placeholder-orange/60"
    ...
  />
  <select
    className="w-full rounded-xl border border-orange bg-gradient-to-b from-[#0a0a0a] to-[#000] px-3 py-2 text-sm text-orange"
    ...
  >
  ...
  <textarea
    className="w-full min-h-[90px] rounded-xl border border-orange bg-gradient-to-b from-[#0a0a0a] to-[#000] px-3 py-2 text-sm outline-none text-orange placeholder-orange/60"
    ...
  />
  <div className="text-xs text-orange/80">...</div>
  <button className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm bg-orange text-black disabled:opacity-60">Voye</button>
</form>

{/* List cards */}
<div className="bg-gradient-to-b from-[#0a0a0a] to-[#000] border border-orange rounded-2xl p-4">...</div>"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/** Types */
type BssComment = {
  id?: string;
  contextKey: string;      // eg: "dirijan" | "fanatik" | "homepage"
  displayName: string;     // user name or "Anonim"
  role?: string;           // Fanatik, Dirijan, elatriye
  message: string;         // comment text
  approved: boolean;       // moderation flag
  createdAt?: any;         // Firestore timestamp
};

/** Hook: load comments (optionally include pending for moderation) */
function useComments(contextKey: string, includePending: boolean) {
  const [items, setItems] = useState<BssComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = collection(db, "bss_comments");
    const q = includePending
      ? query(base, where("contextKey", "==", contextKey), orderBy("createdAt", "desc"))
      : query(
          base,
          where("contextKey", "==", contextKey),
          where("approved", "==", true),
          orderBy("createdAt", "desc"),
        );

    const unsub = onSnapshot(q, (snap) => {
      const out: BssComment[] = [];
      snap.forEach((d) => out.push({ id: d.id, ...(d.data() as any) }));
      setItems(out);
      setLoading(false);
    });

    return () => unsub();
  }, [contextKey]);

  return { items, loading };
}

/** Component */
export default function CommentsBox({
  contextKey,
  allowAnonymous = true,
  moderationMode = false,
  autoReply = true,
  autoReplyMessage = "Mèsi pou kòmantè a! N ap tounen bò ou nan 24 èdtan.",
  autoReplyFrom = "BSS Team",
}: {
  contextKey: string;
  allowAnonymous?: boolean;
  moderationMode?: boolean;
  autoReply?: boolean;
  autoReplyMessage?: string;
  autoReplyFrom?: string;
}) {
  const { items, loading } = useComments(contextKey, moderationMode);

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("Fanatik");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

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

      await addDoc(collection(db, "bss_comments"), {
        contextKey,
        displayName: name || "Anonim",
        role,
        message: trimmed,
        approved: false,
        createdAt: serverTimestamp(),
      } as BssComment);

      if (autoReply) {
        await addDoc(collection(db, "bss_comments"), {
          contextKey,
          displayName: autoReplyFrom,
          role: "Sistèm",
          message: autoReplyMessage,
          approved: true,
          createdAt: serverTimestamp(),
        } as BssComment);
      }

      setMessage("");
      setOk(true);
    } catch (err) {
      console.error(err);
      setError("Gen yon erè pandan anrejistreman.");
    } finally {
      setSubmitting(false);
    }
  }

  async function approve(id?: string) {
    if (!id) return;
    await updateDoc(doc(db, "bss_comments", id), { approved: true });
  }

  async function remove(id?: string) {
    if (!id) return;
    await deleteDoc(doc(db, "bss_comments", id));
  }

  return (
    <section className="mt-10">
      <div className="mx-auto max-w-3xl">
        {/* Info banner */}
        <div className="mb-4 inline-flex items-center gap-2 text-xs bg-black text-orange border border-orange rounded-lg px-3 py-2">
          <span>
            Aprè ou voye yon kòmantè, w ap resevwa yon repons otomatik:{" "}
            <strong>24 èdtan.</strong>
          </span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-2xl grid place-items-center bg-orange text-black">💬</div>
          <h3 className="text-xl font-bold text-white">
            Kòmantè {contextKey === "dirijan" ? "sou Dirijan yo" : contextKey === "fanatik" ? "Fanatik yo" : ""}
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={submitComment} className="bg-black border border-orange rounded-2xl p-4 mb-6">
          <div className="grid gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="w-full rounded-xl border border-orange bg-black px-3 py-2 text-sm outline-none text-white placeholder-white/60"
                placeholder="Non w (opsyonèl)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <select
                className="w-full rounded-xl border border-orange bg-black px-3 py-2 text-sm text-white"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option className="text-black">Fanatik</option>
                <option className="text-black">Dirijan</option>
                <option className="text-black">Mizisyen</option>
                <option className="text-black">Lòt</option>
              </select>
            </div>

            <textarea
              className="w-full min-h-[90px] rounded-xl border border-orange bg-black px-3 py-2 text-sm outline-none text-white placeholder-white/60"
              placeholder="Ekri kòmantè ou la..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <div className="text-xs text-white/80">
                {ok
                  ? "Mèsi! Kòmantè a resevwa. N ap tounen bò ou nan 24 èdtan. Li ap parèt apre verifikasyon."
                  : error || "Kòmantè yo pase pa verifikasyon avan yo piblik."}
              </div>
              <button
                type="submit"
                disabled={submitting || message.trim().length === 0}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm bg-orange text-black disabled:opacity-60"
              >
                Voye
              </button>
            </div>
          </div>
        </form>

        {/* List */}
        <div className="grid gap-3">
          {loading ? (
            <div className="text-sm text-white/80">Chaje kòmantè yo…</div>
          ) : items.length === 0 ? (
            <div className="text-sm text-white/80">Pa gen kòmantè pou kounye a.</div>
          ) : (
            items.map((c) => (
              <div key={c.id} className="bg-black border border-orange rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {c.displayName}{" "}
                      <span className="text-xs font-normal text-orange">• {c.role || "Fanatik"}</span>
                    </div>
                    <div className="mt-1 text-sm text-white whitespace-pre-wrap">{c.message}</div>
                    {!c.approved && !moderationMode && (
                      <div className="mt-1 text-xs text-orange">(An atant verifikasyon)</div>
                    )}
                  </div>

                  {moderationMode && (
                    <div className="flex items-center gap-2">
                      {!c.approved && (
                        <button
                          onClick={() => approve(c.id)}
                          className="inline-flex items-center gap-1 text-xs rounded-lg px-2 py-1 bg-orange text-black border border-orange"
                        >
                          Apwouve
                        </button>
                      )}
                      <button
                        onClick={() => remove(c.id)}
                        className="inline-flex items-center gap-1 text-xs rounded-lg px-2 py-1 bg-black text-orange border border-orange"
                      >
                        Efase
                      </button>
                      {c.approved && (
                        <div className="inline-flex items-center gap-1 text-xs rounded-lg px-2 py-1 bg-black text-orange border border-orange">
                          Apwouve
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
