import { Link } from "react-router-dom";
import { getFeaturedWork } from "../content";
import WorkCard from "../components/WorkCard";

export default function Home() {
  const items = getFeaturedWork(6);

  return (
    <>

      {/* Capability cards (reduced to 3) */}
      <div className="grid">

        {/* Featured work */}
<div
  className="card"
  style={{
    gridColumn: "1 / -1",
    background:
      "linear-gradient(135deg, rgba(91,108,255,0.06), rgba(63,175,143,0.05), rgba(155,126,220,0.06))",
    border: "1px solid var(--border)",
  }}
>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="h2">Featured work</div>
            <Link to="/work" className="btn">
              View all work
            </Link>
          </div>

          <div className="grid" style={{ marginTop: 12 }}>
            {items.map((w) => (
              <WorkCard key={w.slug} w={w} />
            ))}

            {items.length === 0 ? (
              <div className="card" style={{ background: "#fff" }}>
                <div className="h2">No featured work yet</div>
                <p className="p">
                  Add <code>featured: true</code> to frontmatter in any work
                  markdown file.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
