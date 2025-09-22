import CommentsBox from "@/components/CommentsBox";

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
}
