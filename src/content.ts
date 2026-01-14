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
  | "Projects";

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

  // New: featured flag
  featured: boolean;

  // Optional polish fields
  results?: string[];
  artifacts?: Artifact[];

  // Media
  image?: string;   // "/work/foo.jpg" or "https://..."
  youtube?: string; // video id or URL

  // Derived for cards (computed): image or YouTube thumbnail
  thumbnail?: string;
};

type FrontMatter = {
  title?: string;
  category?: WorkCategory;
  date?: string;
  summary?: string;
  tags?: string[];

  featured?: boolean;

  results?: string[];
  artifacts?: Artifact[];

  image?: string;
  youtube?: string;
};

/* =========================
   Helpers
========================= */

function youtubeIdFrom(input: string): string | null {
  const s = input.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;

  try {
    const u = new URL(s);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;

      const m = u.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (m?.[1]) return m[1];

      const e = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (e?.[1]) return e[1];
    }
  } catch {
    // not a URL
  }

  return null;
}

function ytThumb(videoId: string): string {
  // simple, reliable thumbnail URL
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

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

    const youtube = typeof result.attributes.youtube === "string" ? result.attributes.youtube : undefined;
    const youtubeId = youtube ? youtubeIdFrom(youtube) : null;

    const image = typeof result.attributes.image === "string" ? result.attributes.image : undefined;

    const thumbnail = image ? image : (youtubeId ? ytThumb(youtubeId) : undefined);

    const item: WorkItem = {
      slug,
      title: result.attributes.title ?? slug,
      category: result.attributes.category ?? "Product Launches",
      date: result.attributes.date ?? "2000-01-01",
      summary: result.attributes.summary ?? "",
      tags: Array.isArray(result.attributes.tags) ? result.attributes.tags : [],

      featured: result.attributes.featured === true,

      results: Array.isArray(result.attributes.results) ? result.attributes.results : undefined,
      artifacts: Array.isArray(result.attributes.artifacts) ? result.attributes.artifacts : undefined,

      image,
      youtube,
      thumbnail,
    };

    parsed.push({ item, body: result.body });
  }

  // newest first
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

export function getFeaturedWork(limit = 6): WorkItem[] {
  // featured first, then newest; limit for Home
  const featured = CACHE.map((x) => x.item).filter((w) => w.featured);
  featured.sort((a, b) => (a.date < b.date ? 1 : -1));
  return featured.slice(0, limit);
}

export function renderWorkHtml(slug: string): string {
  const found = CACHE.find((x) => x.item.slug === slug);
  if (!found) return "<p>Not found.</p>";
  return marked.parse(found.body) as string;
}
