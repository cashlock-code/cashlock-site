import { Link } from "react-router-dom";
import type { WorkItem } from "../content";

export default function WorkCard({ w }: { w: WorkItem }) {
  return (
    <div className="card half work-card" style={{ background: "#fff" }}>
      {w.thumbnail ? (
        <Link to={`/work/${w.slug}`} style={{ textDecoration: "none" }}>
          <div className="work-thumb">
            <img src={w.thumbnail} alt={w.title} loading="lazy" />
          </div>
        </Link>
      ) : null}

      <div className="work-card-body">
        <div className="kicker">{w.category}</div>
        <div className="h2" style={{ marginTop: 6 }}>
          <Link to={`/work/${w.slug}`}>{w.title}</Link>
        </div>
        <p className="p">{w.summary}</p>

        <div className="badge-row">
          {w.tags.slice(0, 6).map((t) => (
            <span className="badge" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
