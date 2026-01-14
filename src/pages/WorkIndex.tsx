import { useMemo, useState } from "react";
import { getAllWork } from "../content";
import type { WorkCategory } from "../content";
import WorkCard from "../components/WorkCard";

const CATEGORY_OPTIONS: (WorkCategory | "All")[] = [
  "All",
  "Success Stories",
  "Product Launches",
  "Keynotes",
  "Thought Leadership",
  "Go To Market",
  "Projects"
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
          <p className="p">
            Browse and filter selected projects
          </p>
        </div>
      </div>

      {/* Search / filter bar (adds color similar to Contact) */}
      <div
        className="card"
        style={{
          background:
            "linear-gradient(135deg, rgba(91,108,255,0.06), rgba(63,175,143,0.05), rgba(155,126,220,0.06))",
          border: "1px solid var(--border)",
        }}
      >
        <div className="row">
          <input
            className="input"
            placeholder="Search (e.g., launch, enablement, measurement)"
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
          <WorkCard key={w.slug} w={w} />
        ))}

        {items.length === 0 ? (
          <div className="card" style={{ background: "#fff" }}>
            <div className="h2">No results</div>
            <p className="p">Try a different search term or category.</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
