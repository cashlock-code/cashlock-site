import fm from "front-matter";
import { marked } from "marked";

export type WorkCategory =
  | "Success Stories"
  | "Product Launches"
  | "Keynotes"
  | "Thought Leadership"
  | "Go To Market"
  | "AI";

export type WorkItem = {
  slug: string;
  title: string;
  category: WorkCategory;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
};

// Absolute path glob — reliable in Vite
const mdModules = import.meta.glob("/src/content/work/**/*.md", {
  as: "raw",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string) {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

type FrontMatter = {
  title?: string;
  category?: WorkCategory;
  date?: string;
  summary?: string;
  tags?: string[];
};

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
      tags: result.attributes.tags ?? [],
    };

    parsed.push({ item, body: result.body });
  }

  // newest first
  parsed.sort((a, b) => (a.item.date < b.item.date ? 1 : -1));
  return parsed;
}

const CACHE = parseAll();

export function getAllWork(): WorkItem[] {
  return CACHE.map((x) => x.item);
}

export function renderWorkHtml(slug: string): string {
  const found = CACHE.find((x) => x.item.slug === slug);
  if (!found) return "<p>Not found.</p>";
  return marked.parse(found.body) as string;
}
