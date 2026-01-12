import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllWork } from "../content";
import type { WorkCategory } from "../content";

const CATEGORY_OPTIONS: (WorkCategory | "All")[] = [
  "All",
  "Success Stories",
  "Product Launches",
  "Keynotes",
  "Thought Leadership",
  "Go To Market",
  "AI",
];

export default function WorkIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORY_OPTIONS)[number]>("All");

  const items = useMemo(() => {
    const all = getAllWork();
    return all.filter((w) => {
      const matchesCat = cat === "All" ? true : w.category === cat;
      const haystack = `${w.title} ${w.summary} ${w.category} ${w.tags.join(" ")}`.toLowerCase();
      const matchesQ = q.trim() ? haystack.includes(q.trim().toLowerCase()) : true;
      return matchesCat && matchesQ;
    });
  }, [q, cat]);

  return (
    <>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="kicker">Portfolio</div>
          <h1 className="h1">Work</h1>
          <p className="p">Filter by category or search. Add new entries by dropping a Markdown file into src/content/work.</p>
        </div>
      </div>

      <div className="card">
        <div className="row">
          <input
            className="input"
            placeholder="Search (e.g., launch, enablement, metrics)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="select" value={cat} onChange={(e) => setCat(e.target.value as any)}>
            {CATEGORY_OPTIONS.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
          <button className="btn" onClick={() => (setQ(""), setCat("All"))}>
            Clear
          </button>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 14 }}>
        {items.map((w) => (
          <div className="card half" key={w.slug} style={{ background: "#fff" }}>
            <div className="kicker">{w.category}</div>
            <div className="h2" style={{ marginTop: 6 }}>
              <Link to={`/work/${w.slug}`}>{w.title}</Link>
            </div>
            <p className="p">{w.summary}</p>
            <div className="badge-row">
              {w.tags.map((t) => (
                <span className="badge" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="card">
            <div className="h2">No results</div>
            <p className="p">Try a different search term or category.</p>
          </div>
        )}
      </div>
    </>
  );
}
