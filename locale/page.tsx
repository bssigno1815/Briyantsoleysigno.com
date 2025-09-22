"use client";
import useIsAdmin from "@/hooks/useIsAdmin";
import CommentsBox from "@/components/CommentsBox";

export default function Page() {
  const {loading, isAdmin} = useIsAdmin();
  if (loading) return <div className="p-6 text-sm">Chaje…</div>;
  if (!isAdmin) return <div className="p-6 text-sm">Aksè entèdi.</div>;

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Modération Kòmantè</h1>
        <div className="grid gap-8">
          <div><h2 className="text-lg font-semibold mb-2">Dirijan</h2><CommentsBox contextKey="dirijan" moderationMode /></div>
          <div><h2 className="text-lg font-semibold mb-2">Fanatik</h2><CommentsBox contextKey="fanatik" moderationMode /></div>
        </div>
      </section>
    </main>
  );
}import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { title: "BSS 1815", description: "Briyant Solèy Signo 1815" };

export default function RootLayout({ children, params:{locale} }:{
  children: React.ReactNode; params:{locale:string}
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
