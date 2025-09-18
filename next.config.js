import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>briyantsoleysigno.com</h1>
      <p>If you can read this, the build worked 🎉</p>
      <p><Link href="/about">Go to About →</Link></p>
    </main>
  );
}
