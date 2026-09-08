"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Clock, ExternalLink, Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { inferLevel, stripHtml } from "@/lib/integrations/ai-certs/client";
import type { AiCertsCourseSummary, AiCertsCoursesListResponse } from "@/lib/integrations/ai-certs/types";
import type { MsLearnCatalogResponse, MsLearnItem } from "@/lib/integrations/ms-learn/types";
import { Pill } from "@/components/site/ui";

export type CatalogEntry = {
  id: string;
  title: string;
  partner: string;
  category: string;
  duration: string;
  href: string;
  price?: string;
  external?: boolean;
};

type SortKey = "relevance" | "title-asc" | "title-desc" | "partner";
type LiveState = "loading" | "unavailable" | "ready";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "title-asc", label: "Name (A–Z)" },
  { value: "title-desc", label: "Name (Z–A)" },
  { value: "partner", label: "Partner" },
];

const AI_CERTS_API = "https://www.aicerts.ai/wp-json/aicerts-api/v1";
const MS_LEARN_API = "https://learn.microsoft.com/api/catalog/";
const PAGE_SIZE = 24;

export function AllCoursesExplorer({ entries: staticEntries }: { entries: CatalogEntry[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category");

  const [aiCertEntries, setAiCertEntries] = useState<CatalogEntry[]>([]);
  const [aiCertState, setAiCertState] = useState<LiveState>("loading");

  const [msEntries, setMsEntries] = useState<CatalogEntry[]>([]);
  const [msState, setMsState] = useState<LiveState>("loading");

  const [query, setQuery] = useState(initialQuery);
  const [activePartner, setActivePartner] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Live fetch: AI CERTs
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const all: AiCertsCourseSummary[] = [];
      try {
        let page = 1;
        while (page <= 10) {
          const res = await fetch(`${AI_CERTS_API}/courses?page=${page}&per_page=50`);
          if (!res.ok) break;
          const json = (await res.json()) as AiCertsCoursesListResponse;
          if (!json?.success || !json.data?.length) break;
          all.push(...json.data);
          if (page >= (json.total_pages ?? 1)) break;
          page += 1;
        }
      } catch (err) {
        console.error("[all-courses] AI CERTs fetch failed:", err);
      }
      if (cancelled) return;
      const mapped: CatalogEntry[] = all.map((c) => ({
        id: `ai-cert-${c.id}`,
        title: stripHtml(c.title),
        partner: "AI CERTs",
        category: c.categories?.[0] ?? inferLevel(c.title),
        duration: "—",
        href: `/learning-partners/ai-cert/courses/${c.id}`,
      }));
      setAiCertEntries(mapped);
      setAiCertState(mapped.length > 0 ? "ready" : "unavailable");
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Live fetch: Microsoft Learn (modules only, to keep this page's payload reasonable)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${MS_LEARN_API}?type=modules&locale=en-us`);
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as MsLearnCatalogResponse;
        const raw = json.modules ?? [];
        if (cancelled) return;
        const mapped: CatalogEntry[] = raw.map((c: Omit<MsLearnItem, "type">) => ({
          id: `ms-${c.uid}`,
          title: c.title,
          partner: "Microsoft",
          category: c.products?.[0] ?? c.levels?.[0] ?? "Microsoft Learn",
          duration: c.duration_in_minutes ? `${c.duration_in_minutes} min` : "—",
          href: c.url,
          external: true,
        }));
        setMsEntries(mapped);
        setMsState(mapped.length > 0 ? "ready" : "unavailable");
      } catch (err) {
        console.error("[all-courses] Microsoft Learn fetch failed:", err);
        if (!cancelled) setMsState("unavailable");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const entries = useMemo(
    () => [...staticEntries, ...aiCertEntries, ...msEntries],
    [staticEntries, aiCertEntries, msEntries],
  );

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

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activePartner, activeCategory, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasActiveFilters = query.trim() !== "" || activePartner !== null || activeCategory !== null;
  const stillLoadingLive = aiCertState === "loading" || msState === "loading";

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
        {stillLoadingLive ? (
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
            Loading live catalogues…
          </span>
        ) : null}
      </div>

      {/* Results count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-navy">{Math.min(visible.length, filtered.length)}</span> of{" "}
          <span className="font-semibold text-navy">{filtered.length.toLocaleString()}</span> courses
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
        <>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((e) =>
              e.external ? (
                <a
                  key={e.id}
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
                    <span />
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                      View on Microsoft Learn
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </a>
              ) : (
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
              ),
            )}
          </div>

          {visibleCount < filtered.length ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal"
              >
                Load more ({(filtered.length - visibleCount).toLocaleString()} remaining)
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm font-semibold text-navy">No courses match your search</p>
          <p className="mt-1.5 text-sm text-muted-foreground">Try a different keyword or clear the filters above.</p>
        </div>
      )}
    </div>
  );
}