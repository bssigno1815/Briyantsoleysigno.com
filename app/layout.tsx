// src/app/layout.tsx
import './globals.css';

export const metadata = { title: 'BSS' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ht">
      <body>
        {/* KOUCH BACKGROUND LA: toujou dèyè tout bagay */}
        <div className="bss-bg-layer" aria-hidden />
        {children}
      </body>
    </html>
  );
}
