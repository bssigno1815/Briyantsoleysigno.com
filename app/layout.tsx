// src/app/layout.tsx
import './globals.css';

export const metadata = { title: 'BSS' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ht">
      <head>
        <style>{`html,body{background:#000!important;color:#fff}`}</style>
      </head>
      <body>
        <div className="bss-bg" aria-hidden />
        {children}
      </body>
    </html>
  );
}// src/app/layout.tsx
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
