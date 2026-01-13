export default function About() {
  // Pulled from https://www.cashlock.com/fun
  const funImages = [
    {
      src: "https://images.squarespace-cdn.com/content/v1/6716e7131cb5f218824de5ee/4c8c2854-8d2e-44a6-b2be-b5ecc6c00dff/IMG_9819.jpg",
      alt: "Cooking class photo",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/6716e7131cb5f218824de5ee/56c46838-58fd-4769-93ba-7607b584564f/IMG_6952.JPG",
      alt: "Costume photo with dog",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/6716e7131cb5f218824de5ee/54645936-7ab7-4a05-99ed-4e299ee3eb1a/IMG_2457.jpg",
      alt: "Mountain hike photo",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/6716e7131cb5f218824de5ee/13fe372c-3bc2-43c1-b0ba-641be2a55ee5/PXL_20230917_015323563.jpg",
      alt: "Game day photo",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/6716e7131cb5f218824de5ee/2ab186a4-efc7-4ef0-a8c9-1884c60b588c/PXL_20231201_205922606.jpg",
      alt: "Guitar shop photo",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/6716e7131cb5f218824de5ee/c852006a-ac44-4e44-bf11-9193b1a02fdf/IMG_20180728_193206.jpg",
      alt: "Concert photo",
    },
  ];

  return (
    <>
      {/* Top section (moved from Home) */}
      <div className="card" style={{ background: "#fff" }}>
        <div className="kicker">About</div>
  <p className="p" style={{ maxWidth: 900, marginBottom: 22, marginTop: 15 }}>
          Marketing leader with a 20+ year track record of growing revenue and
          building technology brands, including 13+ years as a people manager.
          Passionate about taking complex technology and crafting simple and
          compelling stories.
        </p>

        <div className="grid">
          <div className="card third accent-leadership" style={{ background: "#fff" }}>
            <div className="h2">Leadership</div>
            <p className="p">
              Builds high-performing global teams to scale impact from large enterprises
              to millions of SMBs.
            </p>
          </div>

          <div className="card third accent-growth" style={{ background: "#fff" }}>
            <div className="h2">Growth</div>
            <p className="p">
              Drives business growth by connecting marketing strategy to top-level company
              objectives.
            </p>
          </div>

          <div className="card third accent-creative" style={{ background: "#fff" }}>
            <div className="h2">Creative</div>
            <p className="p">
              Creates polished, impactful marketing and thought leadership that resonates
              with customers.
            </p>
          </div>
        </div>
      </div>

      {/* Fun section at bottom */}
      <div className="card" style={{ marginTop: 14, background: "#fff" }}>
        <div className="kicker">Fun</div>
        <div className="h2">Outside of work</div>

        <div
          className="grid"
          style={{
            marginTop: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {funImages.map((img) => (
  <div
    key={img.src}
    style={{
      border: "1px solid var(--border)",
      borderRadius: 16,
      overflow: "hidden",
      background: "#fff",
    }}
  >
    <div
      style={{
        aspectRatio: "16 / 10", // less vertical crop than a fixed height
        width: "100%",
        position: "relative",
      }}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  </div>
))}

        </div>
      </div>
    </>
  );
}
