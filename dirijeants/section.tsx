import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const dirijanData = [
  { role: "Prezidan", name: "Archange" },
  { role: "Vis Prezidan", name: "Rosano" },
  { role: "Sekretè", name: "Hora" },
  { role: "Sekretè Adjwen", name: "Elson" },
  { role: "Trezorye", name: "Jij Mayen" },
  { role: "Delege", name: "Jimmy" },
  { role: "Delege", name: "Renaud" },
  { role: "Delege", name: "Tiula" },
  { role: "Delege", name: "Jemsie M. J. T." },
  { role: "Pòt Pawòl", name: "Roro" },
  { role: "Pòt Pawòl", name: "Doodly" },
  { role: "Konseye", name: "Aly" },
  { role: "Konseye", name: "Michel" },
];

function initialsOf(name:string){const w=name.split(/\s+/).filter(Boolean);return (w[0]?.[0]||"")+((w[1]?.[0])||"")||"?"}

function MemberCard({ name, role, photo }:{name:string;role:string;photo?:string}) {
  return (
    <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      transition={{duration:0.35}} className="bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-4">
        {photo ? (
          <img src={photo} alt={name} className="h-14 w-14 rounded-xl object-cover border border-neutral-200 dark:border-neutral-800" />
        ) : (
          <div className="h-14 w-14 rounded-xl grid place-items-center border border-neutral-200 dark:border-neutral-800 bg-amber-400/20 text-amber-700 dark:text-amber-300 font-semibold">
            {initialsOf(name).toUpperCase()}
          </div>
        )}
        <div>
          <div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{name}</div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DirijanSection(){
  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-2xl grid place-items-center bg-amber-500 text-white"><Users size={20}/></div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">Tout Dirijan BSS</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Lis konplè. Foto yo ap ajoute demen.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {dirijanData.map((m,i)=>(<MemberCard key={i} name={m.name} role={m.role}/>))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -z-10 top-0 h-32 bg-gradient-to-b from-amber-100/80 dark:from-amber-900/10 to-transparent"/>
    </section>
  );
}
