import DirijanSection from "@/components/DirijanSection";
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
