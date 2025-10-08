// pages/index.js
export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, black, orange)",
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
        BRIYANT SOLÈY SIGNO 1815
      </h1>
      <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        Slogan: Yon motè nèf, yon sèl kout klé san bri.
      </p>
      <button
        style={{
          marginTop: "2rem",
          backgroundColor: "orange",
          border: "none",
          color: "black",
          fontWeight: "bold",
          padding: "0.8rem 2rem",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        BSS
      </button>
    </div>
  );
}
