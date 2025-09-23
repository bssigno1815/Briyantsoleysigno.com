// components/DirijanSection.tsx (only the parts that changed)
function MemberCard({ name, role, photo }: { name: string; role: string; photo?: string }) {
  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-[#000] border border-orange rounded-2xl p-4">
      <div className="flex items-center gap-4">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="h-14 w-14 rounded-xl object-cover border border-orange bg-black"
          />
        ) : (
          <div className="h-14 w-14 rounded-xl grid place-items-center border border-orange bg-black text-orange font-semibold">
            {initialsOf(name)}
          </div>
        )}
        <div>
          <div className="font-semibold text-orange">{name}</div>
          <div className="text-orange/90 text-sm">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default function DirijanSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-2xl grid place-items-center bg-orange text-black">BSS</div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-orange">Tout Dirijan BSS</h2>
            <p className="text-sm text-orange/90">Foto yo ap ajoute demen.</p>
          </div>
        </div>
        {/* keep your map over DIRIJAN data */}
      </div>
    </section>
  );
}import DirijanSection from "@/components/DirijanSection";
import CommentsBox from "@/components/CommentsBox";

export default function DirijanPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-6 text-neutral-900 dark:text-white">
          Dirijan Ofisyèl
        </h1>

        <DirijanSection />
        <CommentsBox
          contextKey="dirijan"
          allowAnonymous
          autoReply
          autoReplyFrom="BSS Team"
          autoReplyMessage="Mèsi pou kòmantè a! N ap tounen bò ou nan 24 èdtan."
        />
      </section>
    </main>
  );
}import CommitteeSection from "@/components/CommitteeSection";

export default function DirijanPage() {
  return (
    <>
      {/* lòt kontni ou yo… */}
      <CommitteeSection />
    </>
  );
}
