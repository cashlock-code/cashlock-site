export default function Contact() {
  const socials = [
    {
      label: "LinkedIn",
      href: "http://linkedin.com/in/cashlock",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@cashlock",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg",
    },
    {
      label: "Bluesky",
      href: "https://bsky.app/profile/cashlock.bsky.social",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bluesky.svg",
    },
  ];

  return (
    <div className="card" style={{ background: "#fff" }}>
      <div className="kicker">Contact</div>

      <div className="h2">Email</div>
      <p className="p">
        <a href="mailto:contact@cashlock.com">contact@cashlock.com</a>
      </p>

      <div className="h2" style={{ marginTop: 18 }}>
        Social
      </div>

      <div className="row" style={{ marginTop: 10 }}>
        {socials.map((s) => (
          <a
            key={s.label}
            className="btn"
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              padding: "10px 12px",
            }}
          >
            <img
              src={s.icon}
              alt={`${s.label} icon`}
              width={18}
              height={18}
              loading="lazy"
              style={{
                filter: "grayscale(100%)",
                opacity: 0.75,
              }}
            />
            <span style={{ color: "var(--text)", fontWeight: 650 }}>
              {s.label}
            </span>
          </a>
        ))}
      </div>

      {/* Hover polish */}
      <style>
        {`
          a.btn:hover img {
            filter: grayscale(0%);
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}
