import CommentsBox from "@/components/CommentsBox";

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
