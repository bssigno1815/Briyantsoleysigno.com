// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ht">
      <Head />
      <body>
        {/* KOUCH BACKGROUND LA */}
        <div className="bss-bg-layer" aria-hidden />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
