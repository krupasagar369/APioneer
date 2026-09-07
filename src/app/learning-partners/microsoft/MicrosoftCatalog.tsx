"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Clock, ExternalLink, Loader2, Search, SlidersHorizontal, Star, X } from "lucide-react";
import type { MsLearnCatalogResponse, MsLearnItem } from "@/lib/integrations/ms-learn/types";
import { ActionButton } from "@/components/site/ui";

// Fetched client-side in the visitor's browser, same pattern used for the AI CERTs
// catalogue — the public Microsoft Learn catalog API is what learn.microsoft.com's
// own course-browsing UI calls directly from the browser.
const CATALOG_URL = "https://learn.microsoft.com/api/catalog/";
const PAGE_SIZE = 20;

type Tab = "modules" | "learningPaths";
type LoadState = "loading" | "unavailable" | "ready";
type SortKey = "relevance" | "title-asc" | "title-desc" | "duration-asc" | "rating-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "title-asc", label: "Name (A–Z)" },
  { value: "title-desc", label: "Name (Z–A)" },
  { value: "duration-asc", label: "Duration (shortest first)" },
  { value: "rating-desc", label: "Highest rated" },
];

function levelLabel(level: string) {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export function MicrosoftCatalog() {
  const [tab, setTab] = useState<Tab>("modules");
  const [dataByTab, setDataByTab] = useState<Record<Tab, MsLearnItem[]>>({ modules: [], learningPaths: [] });
  const [state, setState] = useState<LoadState>("loading");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [query, setQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("relevance");

  useEffect(() => {
    if (dataByTab[tab].length > 0) return; // already loaded this tab
    let cancelled = false;

    async function load() {
      setState("loading");
      try {
        const res = await fetch(`${CATALOG_URL}?type=${tab}&locale=en-us`);
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as MsLearnCatalogResponse;
        const raw = (tab === "modules" ? json.modules : json.learningPaths) ?? [];
        const items: MsLearnItem[] = raw.map((r) => ({ ...r, type: tab }));
        if (cancelled) return;
        setDataByTab((prev) => ({ ...prev, [tab]: items }));
        setState(items.length > 0 ? "ready" : "unavailable");
      } catch (err) {
        console.error("[ms-learn] client-side fetch failed:", err);
        if (!cancelled) setState("unavailable");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [tab, dataByTab]);

  const items = dataByTab[tab];

  const levels = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.levels?.forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [items]);

  const products = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.products?.forEach((p) => set.add(p)));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = items.filter((i) => {
      const matchesQuery =
        !q || i.title.toLowerCase().includes(q) || i.summary?.toLowerCase().includes(q);
      const matchesLevel = !activeLevel || i.levels?.includes(activeLevel);
      const matchesProduct = !activeProduct || i.products?.includes(activeProduct);
      return matchesQuery && matchesLevel && matchesProduct;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "duration-asc":
          return (a.duration_in_minutes ?? Infinity) - (b.duration_in_minutes ?? Infinity);
        case "rating-desc":
          return (b.rating?.average ?? 0) - (a.rating?.average ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [items, query, activeLevel, activeProduct, sort]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeLevel, activeProduct, sort, tab]);

  const visible = filtered.slice(0, visibleCount);
  const hasActiveFilters = query.trim() !== "" || activeLevel !== null || activeProduct !== null;

  return (
    <div className="mt-10">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(["modules", "learningPaths"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === t ? "border-teal text-navy" : "border-transparent text-muted-foreground hover:text-navy"
            }`}
          >
            {t === "modules" ? "Modules" : "Learning Paths"}
          </button>
        ))}
      </div>

      {state === "unavailable" && items.length === 0 ? (
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-dashed border-border p-8">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
          <div>
            <p className="text-base font-semibold text-navy">
              We couldn&apos;t reach the Microsoft Learn catalogue just now
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This partner&apos;s course list is fetched live from Microsoft Learn and is temporarily unavailable.
              Please check back shortly, or contact us directly for current Microsoft course availability.
            </p>
            <div className="mt-5">
              <ActionButton to="/contact" variant="outline">
                Contact us
              </ActionButton>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Search + filters row */}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses…"
                aria-label="Search Microsoft Learn courses"
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
              {levels.map((l) => (
                <option key={l} value={l}>
                  {levelLabel(l)}
                </option>
              ))}
            </select>

            <select
              value={activeProduct ?? ""}
              onChange={(e) => setActiveProduct(e.target.value || null)}
              aria-label="Filter by product"
              className="max-w-[14rem] rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-soft outline-none transition-all duration-300 focus:border-teal focus:ring-4 focus:ring-teal/15"
            >
              <option value="">All products</option>
              {products.map((p) => (
                <option key={p} value={p}>
                  {p}
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

          {/* Results count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {state === "loading" && items.length === 0 ? (
                "Loading…"
              ) : (
                <>
                  <span className="font-semibold text-navy">{filtered.length.toLocaleString()}</span> results
                </>
              )}
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveLevel(null);
                  setActiveProduct(null);
                }}
                className="text-xs font-semibold text-teal hover:underline"
              >
                Clear filters
              </button>
            ) : null}
          </div>

          {state === "loading" && items.length === 0 ? (
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-teal" aria-hidden />
              Loading the live Microsoft Learn catalogue…
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-sm font-semibold text-navy">No courses match your search</p>
              <p className="mt-1.5 text-sm text-muted-foreground">Try a different keyword or clear the filters above.</p>
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4">
                {visible.map((c) => (
                  <a
                    key={c.uid}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:flex-row sm:items-center"
                  >
                    {c.icon_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.icon_url} alt="" className="h-11 w-11 shrink-0 rounded-lg object-contain" />
                    ) : (
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal/10 text-teal">
                        <ExternalLink className="h-4.5 w-4.5" aria-hidden />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold leading-snug text-navy link-underline">{c.title}</h3>
                      {c.summary ? (
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{c.summary}</p>
                      ) : null}
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {c.levels?.[0] ? (
                          <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-semibold text-teal">
                            {levelLabel(c.levels[0])}
                          </span>
                        ) : null}
                        {c.products?.[0] ? (
                          <span className="rounded-full bg-muted px-2.5 py-0.5 font-semibold text-navy-soft">
                            {c.products[0]}
                          </span>
                        ) : null}
                        {c.duration_in_minutes ? (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" aria-hidden />
                            {c.duration_in_minutes} min
                          </span>
                        ) : null}
                        {c.rating?.count ? (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-gold text-gold" aria-hidden />
                            {c.rating.average.toFixed(1)} ({c.rating.count})
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-teal" aria-hidden />
                  </a>
                ))}
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
          )}
        </>
      )}
    </div>
  );
}