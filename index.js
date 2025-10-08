export default function Home() {
  return (
    <div style={{
      background: 'linear-gradient(to bottom, black, orange)',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', color: 'orange' }}>BRIYANT SOLÈY SIGNO 1815</h1>
      <p style={{ fontSize: '1.2rem' }}>Slogan: Yon motè nèf, yon sèl kout klé san bri 🔥</p>
      <img 
        src="/engine.png" 
        alt="BSS Engine" 
        style={{ width: '200px', marginTop: '20px' }} 
      />
      <nav style={{ position: 'fixed', top: '10px', right: '10px' }}>
        <a href="#kontak" style={{ margin: '0 10px', color: 'orange', textDecoration: 'none' }}>Kontak</a>
        <a href="#dirijan" style={{ margin: '0 10px', color: 'orange', textDecoration: 'none' }}>Dirijan</a>
        <a href="#fanbase" style={{ margin: '0 10px', color: 'orange', textDecoration: 'none' }}>Fanbase</a>
        <a href="#dosye" style={{ margin: '0 10px', color: 'orange', textDecoration: 'none' }}>Dosye</a>
      </nav>
    </div>
  );
}
