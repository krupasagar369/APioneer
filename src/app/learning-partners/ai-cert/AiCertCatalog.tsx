"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Layers, Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { inferLevel, stripHtml } from "@/lib/integrations/ai-certs/client";
import type { AiCertsCourseSummary, AiCertsCoursesListResponse } from "@/lib/integrations/ai-certs/types";
import { ActionButton, Pill } from "@/components/site/ui";

// Fetched client-side (in the visitor's browser) rather than on the server. The
// AI CERTs custom REST route is intermittently unreachable from server/edge
// requests (likely bot protection on their WordPress host), but works reliably
// from a normal browser request — matching the legacy site's behaviour.
const API_BASE_URL = "https://www.aicerts.ai/wp-json/aicerts-api/v1";
const MAX_PAGES = 10;
const PAGE_SIZE = 12;

type LoadState = "loading" | "unavailable" | "ready";
type SortKey = "relevance" | "title-asc" | "title-desc" | "level";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "title-asc", label: "Name (A–Z)" },
  { value: "title-desc", label: "Name (Z–A)" },
  { value: "level", label: "Level (Beginner first)" },
];

const levelOrder: Record<string, number> = { beginner: 0, intermediate: 1, advanced: 2 };

export function AiCertCatalog() {
  const [courses, setCourses] = useState<AiCertsCourseSummary[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("relevance");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const all: AiCertsCourseSummary[] = [];
      try {
        let p = 1;
        while (p <= MAX_PAGES) {
          const res = await fetch(`${API_BASE_URL}/courses?page=${p}&per_page=50`);
          if (!res.ok) break;
          const json = (await res.json()) as AiCertsCoursesListResponse;
          if (!json?.success || !json.data?.length) break;
          all.push(...json.data);
          if (p >= (json.total_pages ?? 1)) break;
          p += 1;
        }
      } catch (err) {
        console.error("[ai-certs] client-side fetch failed:", err);
      }
      if (cancelled) return;
      setCourses(all);
      setState(all.length > 0 ? "ready" : "unavailable");
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => c.categories?.forEach((cat) => set.add(cat)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [courses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = courses.filter((c) => {
      const summary = stripHtml(c.description);
      const level = inferLevel(c.title);
      const matchesQuery =
        !q || c.title.toLowerCase().includes(q) || summary.toLowerCase().includes(q);
      const matchesCategory = !activeCategory || c.categories?.includes(activeCategory);
      const matchesLevel = !activeLevel || level === activeLevel;
      return matchesQuery && matchesCategory && matchesLevel;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "level":
          return (levelOrder[inferLevel(a.title)] ?? 1) - (levelOrder[inferLevel(b.title)] ?? 1);
        default:
          return 0;
      }
    });

    return result;
  }, [courses, query, activeCategory, activeLevel, sort]);

  // Reset to page 1 whenever the filtered set changes shape
  useEffect(() => {
    setPage(1);
  }, [query, activeCategory, activeLevel, sort]);

  if (state === "loading") {
    return (
      <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-teal" aria-hidden />
        Loading the live AI CERTs catalogue…
      </div>
    );
  }

  if (state === "unavailable") {
    return (
      <div className="mt-10 flex items-start gap-4 rounded-2xl border border-dashed border-border p-8">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
        <div>
          <p className="text-base font-semibold text-navy">
            We couldn&apos;t reach the AI CERTs catalogue just now
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            This partner&apos;s course list is fetched live from AI CERTs and is temporarily unavailable. Please
            check back shortly, or contact us directly for current AI CERTs course availability.
          </p>
          <div className="mt-5">
            <ActionButton to="/contact" variant="outline">
              Contact us
            </ActionButton>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const hasActiveFilters = query.trim() !== "" || activeCategory !== null || activeLevel !== null;

  return (
    <>
      {/* Search + level + sort row */}
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI CERTs certifications…"
            aria-label="Search AI CERTs courses"
            className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-10 text-sm text-foreground shadow-soft outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-teal focus:ring-4 focus:ring-teal/15"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>

        <select
          value={activeLevel ?? ""}
          onChange={(e) => setActiveLevel(e.target.value || null)}
          aria-label="Filter by level"
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-soft outline-none transition-all duration-300 focus:border-teal focus:ring-4 focus:ring-teal/15"
        >
          <option value="">All levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort courses"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-soft outline-none transition-all duration-300 focus:border-teal focus:ring-4 focus:ring-teal/15"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filter pills */}
      {categories.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === null
                ? "bg-navy text-on-dark"
                : "border border-border bg-background text-muted-foreground hover:border-teal hover:text-navy"
            }`}
          >
            All categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-navy text-on-dark"
                  : "border border-border bg-background text-muted-foreground hover:border-teal hover:text-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      ) : null}

      {/* Results count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-navy">{filtered.length}</span> of {courses.length} certification tracks
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory(null);
              setActiveLevel(null);
            }}
            className="text-xs font-semibold text-teal hover:underline"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((c) => {
            const level = inferLevel(c.title);
            const summary = stripHtml(c.description);
            return (
              <Link
                key={c.id}
                href={`/learning-partners/ai-cert/courses/${c.id}`}
                className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="gold">{level.charAt(0).toUpperCase() + level.slice(1)}</Pill>
                  {c.categories && c.categories[0] ? <Pill>{c.categories[0]}</Pill> : null}
                </div>
                <h3 className="mt-4 text-pretty text-lg leading-snug text-navy link-underline">{c.title}</h3>
                {summary ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{summary}</p>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                  <Layers className="h-4 w-4" aria-hidden />
                  View details
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm font-semibold text-navy">No certifications match your search</p>
          <p className="mt-1.5 text-sm text-muted-foreground">Try a different keyword or clear the filters above.</p>
        </div>
      )}

      {totalPages > 1 ? (
        <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={current <= 1}
            onClick={() => setPage(current - 1)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-teal disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-3 text-sm text-muted-foreground">
            Page {current} of {totalPages}
          </span>
          <button
            type="button"
            disabled={current >= totalPages}
            onClick={() => setPage(current + 1)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-teal disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      ) : null}
    </>
  );
}