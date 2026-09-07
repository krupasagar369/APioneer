"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search, SlidersHorizontal, X } from "lucide-react";
import type { PartnerCourse } from "@/data/partner-types";
import { Pill } from "@/components/site/ui";

type Category = { name: string; slug: string; count: number; icon?: string };

type SortKey = "relevance" | "title-asc" | "title-desc" | "duration-asc" | "duration-desc" | "category";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "title-asc", label: "Name (A–Z)" },
  { value: "title-desc", label: "Name (Z–A)" },
  { value: "duration-asc", label: "Duration (shortest first)" },
  { value: "duration-desc", label: "Duration (longest first)" },
  { value: "category", label: "Category" },
];

function durationDays(duration: string): number {
  const match = duration.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : Number.POSITIVE_INFINITY;
}

export function CourseExplorer({
  courses,
  categories,
  partnerSlug,
}: {
  courses: PartnerCourse[];
  categories: Category[];
  partnerSlug: string;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("relevance");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = courses.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.credential.toLowerCase().includes(q);
      const matchesCategory = !activeCategory || c.categorySlug === activeCategory;
      return matchesQuery && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "duration-asc":
          return durationDays(a.duration) - durationDays(b.duration);
        case "duration-desc":
          return durationDays(b.duration) - durationDays(a.duration);
        case "category":
          return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [courses, query, activeCategory, sort]);

  const hasActiveFilters = query.trim() !== "" || activeCategory !== null;

  return (
    <div>
      {/* Search + sort row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programmes by name, topic or credential…"
            aria-label="Search courses"
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
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === null
                ? "bg-navy text-on-dark"
                : "border border-border bg-background text-muted-foreground hover:border-teal hover:text-navy"
            }`}
          >
            All ({courses.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActiveCategory(c.slug === activeCategory ? null : c.slug)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === c.slug
                  ? "bg-navy text-on-dark"
                  : "border border-border bg-background text-muted-foreground hover:border-teal hover:text-navy"
              }`}
            >
              {c.name} ({c.count})
            </button>
          ))}
        </div>
      ) : null}

      {/* Results count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-navy">{filtered.length}</span> of {courses.length} programmes
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory(null);
            }}
            className="text-xs font-semibold text-teal hover:underline"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Course grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <Link
              key={c.slug}
              href={`/learning-partners/${partnerSlug}/courses/${c.slug}`}
              className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <Pill tone="gold">{c.category}</Pill>
              <h3 className="mt-4 text-pretty text-lg leading-snug text-navy link-underline">{c.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-teal" aria-hidden />
                {c.duration}
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                View programme
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm font-semibold text-navy">No programmes match your search</p>
          <p className="mt-1.5 text-sm text-muted-foreground">Try a different keyword or clear the category filter.</p>
        </div>
      )}
    </div>
  );
}