/// data/dirijan.ts
export const DIRIJAN = [
  { role: "Prezidan",    name: "Archange", photo: "/dirijan/archange.jpg" },
  { role: "Super Admin", name: "MAXIMAX",  photo: "/dirijan/maximax.jpg" },
  { role: "Super Admin", name: "Cangé",    photo: "/dirijan/cange.jpg" },
  // ...
];

// data/ansyen-dirijan.ts
export const FORMER_LEADERS = [
  { role: "Ansyen Prezidan", name: "Jean-Baptiste", years: "2008–2013", photo: "/ansyen/jean-baptiste.jpg" },
  { role: "Ansyen Sekretè",  name: "Mireille",      years: "2014–2018", photo: "/ansyen/mireille.jpg" },
];

// data/fanbase.ts
export const FANBASE = [
  "/fanbase/2025-09-23_fan_001.jpg",
  "/fanbase/2025-09-23_fan_002.jpg",
  // ...
];

// data/fans-zele.ts
export const FANS_ZELE = [
  { name: "Ti Joel", city: "Pòtoprens", since: 2020, photo: "/fanatik/zele/ti-joel.jpg" },
  { name: "Sandra",  city: "Gwo Mòn",   since: 2018, photo: "/fanatik/zele/sandra.jpg" },
];

// data/pitit-kay.ts
export const PITIT_KAY = [
  { name: "Junior 1", section: "Tambou", since: 2024, photo: "/pitit-kay/junior-1.jpg" },
  { name: "Junior 2", section: "Choray", since: 2023, photo: "/pitit-kay/junior-2.jpg" },
];/ components/DirijanSection.tsx (only the parts that changed)
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
}// components/DirijanSection.tsx (only the parts that changed)
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
