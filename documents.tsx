// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ht">
      <Head>
        {/* Prevent white flash before CSS loads */}
        <style>{`html,body{background:#000!important;color:#fff}`}</style>
      </Head>
      <body>
        {/* Fixed gradient layer behind everything */}
        <div className="bss-bg" aria-hidden />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
