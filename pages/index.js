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
        background: "linear-gradient(160deg, black 40%, orange 100%)",
        color: "orange",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 56, margin: 0 }}>BRIYANT SOLEY SIGNO</h1>
      <p style={{ opacity: 0.9, marginTop: 10 }}>
        Welcome — this is the home page.
      </p>
    </div>
  );
}
