import { Link } from "react-router-dom";
import { getFeaturedWork } from "../content";
import WorkCard from "../components/WorkCard";

export default function Home() {
  const items = getFeaturedWork(6);

  return (
    <>
      <div className="kicker">Product Marketing</div>
      <h1 className="h1">I build positioning, launches, and GTM programs that drive adoption.</h1>
      <p className="p">
        This site highlights selected work across product launches, success stories, thought leadership,
        GTM strategy, and applied AI.
      </p>

      <div className="grid">
        <div className="card third">
          <div className="h2">Positioning</div>
          <p className="p">Messaging, narrative, competitive framing, and category strategy.</p>
        </div>
        <div className="card third">
          <div className="h2">Go-to-Market</div>
          <p className="p">Segmentation, pricing/packaging inputs, channel plans, enablement.</p>
        </div>
        <div className="card third">
          <div className="h2">Launches</div>
          <p className="p">Launch planning, asset creation, and execution with measurable outcomes.</p>
        </div>

        <div className="card">
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
                  Add <code>featured: true</code> to frontmatter in any work markdown file.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
