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
}
