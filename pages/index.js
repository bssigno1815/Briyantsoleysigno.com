export default function Home() {
  const brandName = process.env.BRAND_NAME;
  const slogan = process.env.BRAND_SLOGAN;
  const colors = process.env.BRAND_COLORS;

  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <div>
        <h1 style={{ marginBottom: 12 }}>{brandName}</h1>
        <p style={{ fontStyle: "italic" }}>{slogan}</p>
        <small style={{ display: "block", marginTop: 16, opacity: 0.7 }}>
          Colors: {colors}
        </small>
      </div>
    </div>
  );
}
