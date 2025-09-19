// pages/index.js

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, black, orange)",
        color: "orange",
        fontFamily: "Arial, sans-serif",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
        BRIYANT SOLÈY SIGNO 1815
      </h1>
      <p style={{ fontSize: "1.5rem", maxWidth: "600px" }}>
        Yon motè nèf, yon sèl kout klé san bri
      </p>
    </div>
  );
}
