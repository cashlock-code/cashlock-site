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
      <div className="card" style={{ background: "#fff" }}>
        <div className="kicker">About</div>
        <h1 className="h1">Product marketing leader</h1>

        <p className="p">
          I help teams translate complex technology into clear positioning, compelling narratives, and
          GTM execution that drives adoption. My work spans B2B SaaS, ads, analytics, and developer
          platforms, partnering closely with product, sales, and customer teams.
        </p>

        <div className="grid" style={{ marginTop: 14 }}>
          <div className="card third" style={{ background: "#fff" }}>
            <div className="h2">Positioning</div>
            <p className="p">
              Category strategy, messaging, narrative, and competitive framing to make products easy to
              understand and easy to buy.
            </p>
          </div>

          <div className="card third" style={{ background: "#fff" }}>
            <div className="h2">Go-to-market</div>
            <p className="p">
              Launch strategy, enablement, and cross-functional alignment across product, sales, and
              customer success.
            </p>
          </div>

          <div className="card third" style={{ background: "#fff" }}>
            <div className="h2">Measurement</div>
            <p className="p">
              Outcome-driven planning and instrumentation so teams can prove impact and iterate quickly.
            </p>
          </div>
        </div>
      </div>

      {/* Fun section at bottom */}
      <div className="card" style={{ marginTop: 14, background: "#fff" }}>
        <div className="kicker">Fun</div>
        <div className="h2">Outside of work</div>
        <p className="p">
          A few snapshots from life outside product marketing.
        </p>

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
              className="card"
              style={{
                padding: 0,
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
