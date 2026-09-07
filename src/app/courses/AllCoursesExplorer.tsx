"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search, SlidersHorizontal, X } from "lucide-react";
import { Pill } from "@/components/site/ui";

export type CatalogEntry = {
  id: string;
  title: string;
  partner: string;
  category: string;
  duration: string;
  href: string;
  price?: string;
};

type SortKey = "relevance" | "title-asc" | "title-desc" | "partner";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "title-asc", label: "Name (A–Z)" },
  { value: "title-desc", label: "Name (Z–A)" },
  { value: "partner", label: "Partner" },
];

export function AllCoursesExplorer({ entries }: { entries: CatalogEntry[] }) {
  const [query, setQuery] = useState("");
  const [activePartner, setActivePartner] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("relevance");

  const partners = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => set.add(e.partner));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [entries]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => set.add(e.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = entries.filter((e) => {
      const matchesQuery =
        !q || e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.partner.toLowerCase().includes(q);
      const matchesPartner = !activePartner || e.partner === activePartner;
      const matchesCategory = !activeCategory || e.category === activeCategory;
      return matchesQuery && matchesPartner && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "partner":
          return a.partner.localeCompare(b.partner) || a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [entries, query, activePartner, activeCategory, sort]);

  const hasActiveFilters = query.trim() !== "" || activePartner !== null || activeCategory !== null;

  return (
    <div>
      {/* Search + sort row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all courses by name, category or partner…"
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

        <select
          value={activeCategory ?? ""}
          onChange={(e) => setActiveCategory(e.target.value || null)}
          aria-label="Filter by category"
          className="max-w-[16rem] rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-soft outline-none transition-all duration-300 focus:border-teal focus:ring-4 focus:ring-teal/15"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
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

      {/* Partner filter pills */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActivePartner(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            activePartner === null
              ? "bg-navy text-on-dark"
              : "border border-border bg-background text-muted-foreground hover:border-teal hover:text-navy"
          }`}
        >
          All partners ({entries.length})
        </button>
        {partners.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setActivePartner(p === activePartner ? null : p)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activePartner === p
                ? "bg-navy text-on-dark"
                : "border border-border bg-background text-muted-foreground hover:border-teal hover:text-navy"
            }`}
          >
            {p} ({entries.filter((e) => e.partner === p).length})
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-navy">{filtered.length}</span> of {entries.length} courses
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActivePartner(null);
              setActiveCategory(null);
            }}
            className="text-xs font-semibold text-teal hover:underline"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => (
            <Link
              key={e.id}
              href={e.href}
              className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="teal">{e.partner}</Pill>
                <Pill tone="gold">{e.category}</Pill>
              </div>
              <h3 className="mt-4 text-pretty text-lg leading-snug text-navy link-underline">{e.title}</h3>
              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-teal" aria-hidden />
                {e.duration}
              </div>
              <div className="mt-auto flex items-center justify-between pt-6">
                {e.price ? <span className="font-display text-base font-semibold text-navy">{e.price}</span> : <span />}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                  View programme
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm font-semibold text-navy">No courses match your search</p>
          <p className="mt-1.5 text-sm text-muted-foreground">Try a different keyword or clear the filters above.</p>
        </div>
      )}
    </div>
  );
}