import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllWork, renderWorkHtml } from "../content";

function isSafeUrl(url: string) {
  // Allow root-relative paths like "/work/foo.jpg" (from /public)
  if (url.startsWith("/")) return true;

  // Allow http/https URLs
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

function youtubeIdFrom(input: string): string | null {
  const s = input.trim();

  // If user pasted just the ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;

  // Try parsing known URL forms
  try {
    const u = new URL(s);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;

      // shorts: /shorts/{id}
      const m = u.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (m?.[1]) return m[1];

      // embed: /embed/{id}
      const e = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (e?.[1]) return e[1];
    }
  } catch {
    // not a URL
  }

  return null;
}

export default function WorkDetail() {
  const { slug } = useParams();

  const item = useMemo(() => {
    const all = getAllWork();
    return all.find((w) => w.slug === slug);
  }, [slug]);

  if (!item) {
    return (
      <div className="card">
        <div className="h2">Not found</div>
        <p className="p">That work item does not exist.</p>
        <Link to="/work" className="btn">
          Back to Work
        </Link>
      </div>
    );
  }

  const html = renderWorkHtml(item.slug);
  const ytId = item.youtube ? youtubeIdFrom(item.youtube) : null;

  return (
    <>
      <Link to="/work" className="btn">
        ← Back to Work
      </Link>

      <div className="card" style={{ marginTop: 14, background: "#fff" }}>
        <div className="kicker">{item.category}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>
          {item.title}
        </h1>
        <p className="p">{item.summary}</p>

        <div className="badge-row">
          {item.tags.map((t) => (
            <span className="badge" key={t}>
              {t}
            </span>
          ))}
        </div>

        {(item.image || ytId) ? <div className="hr" /> : null}

        {/* Media */}
        {(item.image || ytId) ? (
          <div className="grid">
            {item.image && isSafeUrl(item.image) ? (
              <div className="card half" style={{ background: "#fff" }}>
                <div className="h2">Image</div>
                <div style={{ marginTop: 10 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

            {ytId ? (
              <div className="card half" style={{ background: "#fff" }}>
                <div className="h2">Video</div>
                <p className="p" style={{ marginBottom: 10 }}>
                  Embedded YouTube video.
                </p>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%", // 16:9
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {(item.results?.length || item.artifacts?.length) ? <div className="hr" /> : null}

        {/* Polished blocks */}
        <div className="grid">
          {item.results?.length ? (
            <div className="card half" style={{ background: "#fff" }}>
              <div className="h2">Results</div>
              <ul style={{ marginTop: 10 }}>
                {item.results.map((r) => {
                  const hasColon = r.includes(":");
                  const left = hasColon ? r.slice(0, r.indexOf(":")) : "";
                  const right = hasColon ? r.slice(r.indexOf(":") + 1).trim() : r;

                  return (
                    <li key={r} style={{ marginBottom: 8 }}>
                      {hasColon ? (
                        <>
                          <strong style={{ color: "var(--text)" }}>{left}:</strong>
                          <span style={{ color: "var(--muted)" }}> {right}</span>
                        </>
                      ) : (
                        <span style={{ color: "var(--muted)" }}>{right}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {item.artifacts?.length ? (
            <div className="card half" style={{ background: "#fff" }}>
              <div className="h2">Artifacts</div>
              <p className="p" style={{ marginBottom: 10 }}>
                Representative deliverables (where shareable).
              </p>
              <div className="row">
                {item.artifacts
                  .filter((a) => a?.label && a?.url && isSafeUrl(a.url))
                  .map((a) => (
                    <a
                      key={`${a.label}-${a.url}`}
                      className="btn"
                      href={a.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      {a.label}
                    </a>
                  ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="hr" />

        {/* Main narrative */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
}
