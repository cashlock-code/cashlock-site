import matter from "gray-matter";
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

// Import every markdown file under src/content/work
const mdModules = import.meta.glob("./content/work/**/*.md", {
  as: "raw",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string) {
  // ./content/work/product-launches/my-slug.md -> my-slug
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.md$/, "");
}

function parseAll(): Array<{ item: WorkItem; body: string }> {
  const parsed: Array<{ item: WorkItem; body: string }> = [];

  for (const [path, raw] of Object.entries(mdModules)) {
    const slug = slugFromPath(path);
    const { data, content } = matter(raw);

    // Minimal validation with sensible defaults
    const item: WorkItem = {
      slug,
      title: String(data.title ?? slug),
      category: data.category as WorkCategory,
      date: String(data.date ?? "2000-01-01"),
      summary: String(data.summary ?? ""),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    };

    parsed.push({ item, body: content });
  }

  // Sort newest first by date
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
