export const metadata = { title: "BRIYANT SOLEY 1815" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ht">
      <body className="min-h-screen bg-black text-white">{children}</body>
    </html>
  );
}
