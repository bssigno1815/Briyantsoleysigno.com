import IstwaSection from "@/components/IstwaSection";

export default function Page() {
  return (
    <main>
      {/* Intro bann lan */}
      <IntroSection />

      {/* Istwa Bann lan */}
      <IstwaSection />

      {/* Dirijan, Mizisyen, Fanatik, elatriye */}
    </main>
  );
}import DirijanSection from "@/components/DirijanSection";
import CommentsBox from "@/components/CommentsBox";

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-6 text-neutral-900 dark:text-white">
          Dirijan Ofisyèl
        </h1>

        <DirijanSection />

        {/* Kòmantè pou Dirijan yo + repons otomatik 24h */}
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
}
