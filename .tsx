import CommentsBox from "@/components/CommentsBox";

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
