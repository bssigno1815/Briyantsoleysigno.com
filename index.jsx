export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        margin: 0,
        display: 'grid',
        placeItems: 'center',
        background:
          'linear-gradient(180deg, #000 0%, #0a0a0a 40%, #ff7a00 100%)',
        color: '#ff7a00',
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 'clamp(28px,6vw,56px)' }}>
          briyantsoleysigno.com
        </h1>
        <p style={{ marginTop: 12 }}>It works! 🚀</p>
      </div>
    </main>
  );
}
