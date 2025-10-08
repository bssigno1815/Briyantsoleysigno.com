export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to right, black, orange)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.8)",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          padding: "15px",
          fontSize: "18px",
          zIndex: 1000,
        }}
      >
        <a href="#dirijan" style={{ color: "orange", textDecoration: "none" }}>DIRIJAN</a>
        <a href="#fanbase" style={{ color: "orange", textDecoration: "none" }}>FANBASE</a>
        <a href="#dosye" style={{ color: "orange", textDecoration: "none" }}>DOSYE</a>
        <a href="#kontak" style={{ color: "orange", textDecoration: "none" }}>KONTAK</a>
      </nav>

      <h1 style={{ fontSize: "45px", marginBottom: "20px" }}>BRIYANT SOLÈY SIGNO 1815</h1>
      <p style={{ fontSize: "20px", color: "orange" }}>
        Slogan: Yon motè nèf, yon sèl kout klé san bri ⚙️
      </p>
    </div>
  );
}
