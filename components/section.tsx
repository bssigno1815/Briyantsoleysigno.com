import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, ShieldCheck, X, Check, Info } from "lucide-react";
import { getFirestore, collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";

type BssComment = { id?:string; contextKey:string; displayName:string; role?:string; message:string; approved:boolean; createdAt?:any; };

function useComments(contextKey:string, includePending:boolean){
  const db = useMemo(()=>getFirestore(),[]);
  const [items,setItems]=useState<BssComment[]>([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const base=collection(db,"bss_comments");
    const q = includePending
      ? query(base, where("contextKey","==",contextKey), orderBy("createdAt","desc"))
      : query(base, where("contextKey","==",contextKey), where("approved","==",true), orderBy("createdAt","desc"));
    const unsub=onSnapshot(q,(snap)=>{const out:BssComment[]=[];snap.forEach(d=>out.push({id:d.id,...(d.data() as any)}));setItems(out);setLoading(false);});
    return ()=>unsub();
  },[db,contextKey,includePending]);
  return {items,loading};
}

export default function CommentsBox({contextKey,allowAnonymous=true,moderationMode=false,autoReply=false,autoReplyMessage="Mèsi pou kòmantè a! N ap tounen bò ou nan 24 èdtan.",autoReplyFrom="BSS Team"}:{
  contextKey:string; allowAnonymous?:boolean; moderationMode?:boolean; autoReply?:boolean; autoReplyMessage?:string; autoReplyFrom?:string;
}){
  const db = useMemo(()=>getFirestore(),[]);
  const {items,loading}=useComments(contextKey,moderationMode);
  const [displayName,setDisplayName]=useState(""); const [role,setRole]=useState("Fanatik");
  const [message,setMessage]=useState(""); const [submitting,setSubmitting]=useState(false);
  const [error,setError]=useState<string|null>(null); const [ok,setOk]=useState(false);

  async function submitComment(e:React.FormEvent){
    e.preventDefault(); setError(null); setOk(false);
    const trimmed=message.trim(); const name=displayName.trim();
    if(!trimmed || (!allowAnonymous && !name)){ setError("Tanpri ekri yon mesaj e mete non ou."); return; }
    try{
      setSubmitting(true);
      await addDoc(collection(db,"bss_comments"),{ contextKey, displayName: name||"Anonim", role, message:trimmed, approved:false, createdAt:serverTimestamp() } as BssComment);
      if(autoReply){
        await addDoc(collection(db,"bss_comments"),{ contextKey, displayName:autoReplyFrom, role:"Sistèm", message: autoReplyMessage, approved:true, createdAt:serverTimestamp() } as BssComment);
      }
      setMessage(""); setOk(true);
    }catch{ setError("Gen yon erè pandan anrejistreman."); } finally{ setSubmitting(false); }
  }
  async function approve(id?:string){ if(!id) return; await updateDoc(doc(db,"bss_comments",id),{approved:true}); }
  async function remove(id?:string){ if(!id) return; await deleteDoc(doc(db,"bss_comments",id)); }

  return (
    <section className="mt-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 text-xs bg-amber-500/10 text-amber-800 dark:text-amber-300 rounded-lg px-3 py-2">
          <Info size={14}/><span>Aprè ou voye yon kòmantè, w ap resevwa yon repons otomatik: <strong>N ap tounen bò ou nan 24 èdtan.</strong></span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-2xl grid place-items-center bg-amber-500 text-white"><MessageSquare size={18}/></div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Kòmantè {contextKey==="dirijan"?"sou Dirijan yo":contextKey==="fanatik"?"Fanatik yo":""}</h3>
        </div>

        <motion.form onSubmit={submitComment} initial={{opacity:0}} animate={{opacity:1}}
          className="bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 mb-6">
          <div className="grid gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm outline-none"
                placeholder="Non w (opsyonèl)" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} />
              <select className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm"
                value={role} onChange={(e)=>setRole(e.target.value)}>
                <option>Fanatik</option><option>Dirijan</option><option>Mizisyen</option><option>Lòt</option>
              </select>
            </div>
            <textarea className="w-full min-h-[90px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm outline-none"
              placeholder="Ekri kòmantè ou la..." value={message} onChange={(e)=>setMessage(e.target.value)} />
            <div className="flex items-center justify-between">
              <div className="text-xs text-neutral-500">
                {ok ? "Mèsi! Kòmantè a resevwa. N ap tounen bò ou nan 24 èdtan. Li ap parèt apre verifikasyon." : (error || "Kòmantè yo pase pa verifikasyon avan yo piblik.")}
              </div>
              <button type="submit" disabled={submitting || message.trim().length===0}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm bg-amber-500 text-white disabled:opacity-60">
                <Send size={16}/> Voye
              </button>
            </div>
          </div>
        </motion.form>

        <div className="grid gap-3">
          {loading ? (<div className="text-sm text-neutral-500">Chaje kòmantè yo…</div>)
          : items.length===0 ? (<div className="text-sm text-neutral-500">Pa gen kòmantè pou kounye a.</div>)
          : items.map((c)=>(
            <div key={c.id} className="bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {c.displayName} <span className="text-xs font-normal text-neutral-500">• {c.role||"Fanatik"}</span>
                  </div>
                  <div className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{c.message}</div>
                  {!c.approved && (<div className="mt-1 text-xs text-neutral-500">(An atant verifikasyon)</div>)}
                </div>
                <div className="flex items-center gap-2">
                  {!c.approved && (<button onClick={()=>approve(c.id)} className="inline-flex items-center gap-1 text-xs rounded-lg px-2 py-1 bg-emerald-500/10 text-emerald-700"><Check size={14}/> Apwouve</button>)}
                  <button onClick={()=>remove(c.id)} className="inline-flex items-center gap-1 text-xs rounded-lg px-2 py-1 bg-rose-500/10 text-rose-700"><X size={14}/> Efase</button>
                  {c.approved && (<div className="inline-flex items-center gap-1 text-xs rounded-lg px-2 py-1 bg-amber-500/10 text-amber-700"><ShieldCheck size={14}/> Apwouve</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
