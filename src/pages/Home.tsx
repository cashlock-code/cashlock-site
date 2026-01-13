import { Link } from "react-router-dom";
import { getFeaturedWork } from "../content";
import WorkCard from "../components/WorkCard";

export default function Home() {
  const items = getFeaturedWork(6);

  return (
    <>
      {/* Lead summary */}
      <p
        className="p"
        style={{
          maxWidth: 900,
          fontSize: "1.05rem",
          lineHeight: 1.6,
          marginBottom: 22,
        }}
      >
        Marketing leader with a 20+ year track record of growing revenue and
        building technology brands, including 13+ years as a people manager.
        Passionate about taking complex technology and crafting simple and compelling stories.
      </p>

      {/* Capability cards (reduced to 3) */}
      <div className="grid">
       <div className="card third accent-leadership">
    <div className="h2">Leadership</div>
    <p className="p">
      Builds high-performing global teams to scale impact from large
      enterprises to millions of SMBs.
    </p>
  </div>

  <div className="card third accent-growth">
    <div className="h2">Growth</div>
    <p className="p">
      Drives business growth by connecting marketing strategy to top-level
      company objectives.
    </p>
  </div>

  <div className="card third accent-creative">
    <div className="h2">Creative</div>
    <p className="p">
      Creates polished, impactful marketing and thought leadership that
      resonates with customers.
    </p>
  </div>

        {/* Featured work */}
        <div className="card" style={{ gridColumn: "1 / -1" }}>
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
