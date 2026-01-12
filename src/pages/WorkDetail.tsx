import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllWork, renderWorkHtml } from "../content";

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

        <div className="hr" />

        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
}
