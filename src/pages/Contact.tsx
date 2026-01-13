export default function Contact() {
  const socials = [
    {
      label: "LinkedIn",
      href: "http://linkedin.com/in/cashlock",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
      tint: "rgba(91, 108, 255, 0.10)", // leadership
      border: "rgba(91, 108, 255, 0.28)",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@cashlock",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg",
      tint: "rgba(63, 175, 143, 0.10)", // growth
      border: "rgba(63, 175, 143, 0.28)",
    },
    {
      label: "Bluesky",
      href: "https://bsky.app/profile/cashlock.bsky.social",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bluesky.svg",
      tint: "rgba(155, 126, 220, 0.10)", // creative
      border: "rgba(155, 126, 220, 0.28)",
    },
  ];

  return (
    <div className="card" style={{ background: "#fff", padding: 0, overflow: "hidden" }}>
      {/* Accent strip */}
      
      <div style={{ padding: 18 }}>
        <div className="kicker">Contact</div>

        {/* Email primary */}
        <div
          style={{
            marginTop: 12,
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 16,
            background:
              "linear-gradient(135deg, rgba(91,108,255,0.10), rgba(63,175,143,0.06), rgba(155,126,220,0.10))",
          }}
        >
          <div
            style={{
              fontFamily: '"Space Grotesk", ui-sans-serif, system-ui',
              fontSize: "1.15rem",
              fontWeight: 650,
              letterSpacing: "-0.01em",
              marginBottom: 6,
              color: "var(--text)",
            }}
          >
            Email
          </div>

          <a
            href="mailto:contact@cashlock.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "var(--text)",
              fontWeight: 650,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "var(--accent-growth)",
                display: "inline-block",
              }}
            />
            contact@cashlock.com
          </a>

          <div className="p" style={{ marginTop: 10 }}>
            Best for speaking opportunities, consulting, and collaborations.
          </div>
        </div>

        {/* Social */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: '"Space Grotesk", ui-sans-serif, system-ui',
              fontSize: "1.1rem",
              fontWeight: 650,
              letterSpacing: "-0.01em",
              color: "var(--text)",
            }}
          >
            Social
          </div>
        </div>

        <div
          style={{
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: 14,
                borderRadius: 16,
                border: `1px solid ${s.border}`,
                background: s.tint,
                textDecoration: "none",
                color: "var(--text)",
                transition: "transform 120ms ease, box-shadow 120ms ease, background 120ms ease",
              }}
              className="contact-badge"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src={s.icon}
                  alt={`${s.label} icon`}
                  width={18}
                  height={18}
                  loading="lazy"
                  style={{
                    opacity: 0.9,
                    filter: "grayscale(0%)",
                  }}
                />
                <div style={{ fontWeight: 700 }}>{s.label}</div>
              </div>

              <div style={{ color: "var(--muted)" }}>→</div>
            </a>
          ))}
        </div>

        {/* Small closing note */}
  
      </div>

      {/* Hover polish */}
      <style>
        {`
          .contact-badge:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }
        `}
      </style>
    </div>
  );
}
