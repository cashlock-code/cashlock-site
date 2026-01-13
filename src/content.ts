import fm from "front-matter";
import { marked } from "marked";

/* =========================
   Types
========================= */

export type WorkCategory =
  | "Success Stories"
  | "Product Launches"
  | "Keynotes"
  | "Thought Leadership"
  | "Go To Market"
  | "AI";

export type Artifact = {
  label: string;
  url: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  category: WorkCategory;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];

  // Optional polish fields
  results?: string[];
  artifacts?: Artifact[];

  // New optional media fields
  image?: string;   // "/work/foo.jpg" (from /public) or "https://..."
  youtube?: string; // video id or URL
};

type FrontMatter = {
  title?: string;
  category?: WorkCategory;
  date?: string;
  summary?: string;
  tags?: string[];
  results?: string[];
  artifacts?: Artifact[];
  image?: string;
  youtube?: string;
};

/* =========================
   Markdown loader
========================= */

const mdModules = import.meta.glob("/src/content/work/**/*.md", {
  as: "raw",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

/* =========================
   Parse + cache
========================= */

function parseAll(): Array<{ item: WorkItem; body: string }> {
  const parsed: Array<{ item: WorkItem; body: string }> = [];

  for (const [path, raw] of Object.entries(mdModules)) {
    const slug = slugFromPath(path);
    const result = fm<FrontMatter>(raw);

    const item: WorkItem = {
      slug,
      title: result.attributes.title ?? slug,
      category: result.attributes.category ?? "Product Launches",
      date: result.attributes.date ?? "2000-01-01",
      summary: result.attributes.summary ?? "",
      tags: Array.isArray(result.attributes.tags) ? result.attributes.tags : [],

      results: Array.isArray(result.attributes.results) ? result.attributes.results : undefined,
      artifacts: Array.isArray(result.attributes.artifacts) ? result.attributes.artifacts : undefined,

      image: typeof result.attributes.image === "string" ? result.attributes.image : undefined,
      youtube: typeof result.attributes.youtube === "string" ? result.attributes.youtube : undefined,
    };

    parsed.push({ item, body: result.body });
  }

  parsed.sort((a, b) => (a.item.date < b.item.date ? 1 : -1));
  return parsed;
}

const CACHE = parseAll();

/* =========================
   Public API
========================= */

export function getAllWork(): WorkItem[] {
  return CACHE.map((x) => x.item);
}

export function renderWorkHtml(slug: string): string {
  const found = CACHE.find((x) => x.item.slug === slug);
  if (!found) return "<p>Not found.</p>";
  return marked.parse(found.body) as string;
}
