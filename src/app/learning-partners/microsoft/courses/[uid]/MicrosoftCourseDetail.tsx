"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  Clock,
  Info,
  Layers,
  ListChecks,
  Loader2,
  Star,
  Tag,
} from "lucide-react";
import type { MsLearnCatalogResponse, MsLearnItem, MsLearnUnit } from "@/lib/integrations/ms-learn/types";
import { ActionButton, PageHero, Pill } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";
import { downloadGeneratedBrochure } from "@/lib/pdf/downloadGeneratedBrochure";

// Same public catalogue endpoint used on the listing page. It doesn't expose a
// single-item lookup, so we load the collections and pick out the matching uid —
// the whole point is that nothing on this page links back out to learn.microsoft.com.
const CATALOG_URL = "https://learn.microsoft.com/api/catalog/";

type LoadState = "loading" | "notfound" | "ready";

type Curriculum = {
  label: string;
  items: { uid: string; title: string; duration_in_minutes?: number; href?: string }[];
};

function levelLabel(level: string) {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function titleCase(s: string) {
  return s
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function MicrosoftCourseDetail({ uid, partnerName }: { uid: string; partnerName: string }) {
  const [course, setCourse] = useState<MsLearnItem | null>(null);
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState("loading");
      try {
        const [modulesRes, pathsRes, unitsRes] = await Promise.all([
          fetch(`${CATALOG_URL}?type=modules&locale=en-us`),
          fetch(`${CATALOG_URL}?type=learningPaths&locale=en-us`),
          fetch(`${CATALOG_URL}?type=units&locale=en-us`),
        ]);
        if (!modulesRes.ok && !pathsRes.ok) throw new Error("catalog unavailable");

        const modulesJson = modulesRes.ok ? ((await modulesRes.json()) as MsLearnCatalogResponse) : {};
        const pathsJson = pathsRes.ok ? ((await pathsRes.json()) as MsLearnCatalogResponse) : {};
        const unitsJson: { units?: MsLearnUnit[] } = unitsRes.ok ? await unitsRes.json() : {};

        const foundModule = modulesJson.modules?.find((m) => m.uid === uid);
        const foundPath = !foundModule ? pathsJson.learningPaths?.find((p) => p.uid === uid) : undefined;
        const found = foundModule ?? foundPath;

        if (cancelled) return;

        if (!found) {
          setState("notfound");
          return;
        }

        const type: "modules" | "learningPaths" = foundModule ? "modules" : "learningPaths";
        setCourse({ ...found, type });

        // Build the curriculum breakdown: a module lists its units, a learning path
        // lists its component modules — both cross-referenced from data we already
        // have loaded, no extra fetches needed beyond the units collection above.
        if (type === "modules" && found.units?.length) {
          const unitMap = new Map((unitsJson.units ?? []).map((u) => [u.uid, u]));
          setCurriculum({
            label: "Module Units",
            items: found.units.map((unitUid, i) => {
              const u = unitMap.get(unitUid);
              return {
                uid: unitUid,
                title: u?.title ?? `Unit ${i + 1}`,
                duration_in_minutes: u?.duration_in_minutes,
              };
            }),
          });
        } else if (type === "learningPaths" && found.modules?.length) {
          const moduleMap = new Map((modulesJson.modules ?? []).map((m) => [m.uid, m]));
          setCurriculum({
            label: "Included Modules",
            items: found.modules.map((modUid, i) => {
              const m = moduleMap.get(modUid);
              return {
                uid: modUid,
                title: m?.title ?? `Module ${i + 1}`,
                duration_in_minutes: m?.duration_in_minutes,
                href: `/learning-partners/microsoft/courses/${encodeURIComponent(modUid)}`,
              };
            }),
          });
        } else {
          setCurriculum(null);
        }

        setState("ready");
      } catch (err) {
        console.error(`[ms-learn] course detail fetch failed for uid ${uid}:`, err);
        if (!cancelled) setState("notfound");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [uid]);

  if (state === "loading") {
    return (
      <section className="section-y container-x">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-teal" aria-hidden />
          Loading course details…
        </div>
      </section>
    );
  }

  if (state === "notfound" || !course) {
    notFound();
    return null;
  }

  const level = course.levels?.[0] ? levelLabel(course.levels[0]) : null;
  const product = course.products?.[0];
  const typeLabel = course.type === "learningPaths" ? "Learning Path" : "Module";
  const totalMinutes =
    curriculum?.items.reduce((sum, it) => sum + (it.duration_in_minutes ?? 0), 0) || course.duration_in_minutes;

  async function handleDownloadBrochure() {
    setDownloading(true);
    const result = await downloadGeneratedBrochure({
      title: course!.title,
      partner: partnerName,
      category: product,
      credential: `${typeLabel}${level ? ` · ${level} level` : ""}`,
      duration: totalMinutes ? `${totalMinutes} minutes` : undefined,
      intro: course!.summary || undefined,
      objectives: curriculum?.items.map((it) => it.title),
      prerequisites: course!.prerequisites ? [course!.prerequisites] : undefined,
      outline: curriculum
        ? [{ heading: curriculum.label, points: curriculum.items.map((it) => it.title) }]
        : undefined,
    });
    if (!result.ok) {
      console.error("[ms-learn] brochure download failed:", result.error);
    }
    setDownloading(false);
  }

  return (
    <>
      <PageHero
        eyebrow={`${partnerName} · ${typeLabel}`}
        title={course.title}
        description={course.summary || "Official Microsoft Learn content, delivered through APIONEER."}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Learning Partners", to: "/learning-partners" },
          { label: partnerName, to: "/learning-partners/microsoft" },
          { label: course.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          {level ? <Pill tone="gold">{level} Level</Pill> : null}
          {product ? <Pill>{product}</Pill> : null}
          {course.subjects?.[0] ? <Pill>{titleCase(course.subjects[0])}</Pill> : null}
          <Pill tone="teal">
            <BadgeCheck className="mr-1 inline h-3 w-3" aria-hidden />
            Official Microsoft Learn Content
          </Pill>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <ActionButton to="/contact" variant="gold" size="lg">
            Enroll Now
          </ActionButton>
          <ActionButton to="/contact" variant="outline" size="lg">
            Request Callback
          </ActionButton>
          <ActionButton variant="ghost-light" size="lg" onClick={handleDownloadBrochure}>
            {downloading ? "Preparing…" : "Download Brochure"}
          </ActionButton>
        </div>
      </PageHero>

      <section className="section-y container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0">
            {course.summary ? (
              <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 text-xl text-navy">
                  <Info className="h-5 w-5 text-teal" aria-hidden />
                  About This {typeLabel}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{course.summary}</p>
              </div>
            ) : null}

            <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-xl text-navy">
                <ListChecks className="h-5 w-5 text-teal" aria-hidden />
                At a Glance
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {totalMinutes ? (
                  <div className="rounded-xl bg-background p-4">
                    <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      Duration
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy">{totalMinutes} minutes</p>
                  </div>
                ) : null}
                {course.rating?.count ? (
                  <div className="rounded-xl bg-background p-4">
                    <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">
                      <Star className="h-3.5 w-3.5" aria-hidden />
                      Learner Rating
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy">
                      {course.rating.average.toFixed(1)} / 5 ({course.rating.count.toLocaleString()} ratings)
                    </p>
                  </div>
                ) : null}
                {level ? (
                  <div className="rounded-xl bg-background p-4">
                    <p className="text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">Level</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy">{level}</p>
                  </div>
                ) : null}
                {product ? (
                  <div className="rounded-xl bg-background p-4">
                    <p className="text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">Product</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy">{product}</p>
                  </div>
                ) : null}
                {course.roles?.length ? (
                  <div className="rounded-xl bg-background p-4 sm:col-span-2">
                    <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">
                      <Briefcase className="h-3.5 w-3.5" aria-hidden />
                      Suited For
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {course.roles.map((r) => (
                        <span key={r} className="rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-semibold text-teal">
                          {titleCase(r)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {course.subjects?.length ? (
                  <div className="rounded-xl bg-background p-4 sm:col-span-2">
                    <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">
                      <Tag className="h-3.5 w-3.5" aria-hidden />
                      Subjects
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {course.subjects.map((s) => (
                        <span key={s} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-navy-soft">
                          {titleCase(s)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {course.prerequisites ? (
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-6">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-navy">Prerequisites</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy/80">{course.prerequisites}</p>
                </div>
              </div>
            ) : null}

            {curriculum && curriculum.items.length ? (
              <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 text-xl text-navy">
                  <BookOpen className="h-5 w-5 text-teal" aria-hidden />
                  {curriculum.label}
                  <span className="text-sm font-normal text-muted-foreground">{curriculum.items.length} items</span>
                </h2>
                <div className="mt-5 divide-y divide-border">
                  {curriculum.items.map((it, i) => {
                    const row = (
                      <>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                          {i + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-navy">{it.title}</h3>
                          {it.duration_in_minutes ? (
                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" aria-hidden />
                              {it.duration_in_minutes} min
                            </p>
                          ) : null}
                        </div>
                      </>
                    );
                    return it.href ? (
                      <Link
                        key={it.uid}
                        href={it.href}
                        className="group flex gap-4 py-4 first:pt-0 last:pb-0 hover:bg-teal/5"
                      >
                        {row}
                      </Link>
                    ) : (
                      <div key={it.uid} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                        {row}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-8 rounded-2xl border border-teal/25 bg-teal/8 p-6 text-sm leading-relaxed text-navy">
              This {typeLabel.toLowerCase()} is delivered as part of APIONEER&apos;s authorised Microsoft Learn
              training. Our advisors can confirm full syllabus, batch schedules and pricing when you enquire.
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 grid gap-6">
            <div className="rounded-3xl border border-border bg-surface-gradient p-7 shadow-card">
              {course.icon_url ? (
                <div className="mb-5 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.icon_url} alt="" className="h-16 w-16 object-contain" />
                </div>
              ) : null}
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-soft">{typeLabel}</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-navy">{course.title}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {level ? <Pill tone="gold">{level} level</Pill> : null}
                {product ? <Pill>{product}</Pill> : null}
              </div>
              <div className="mt-7 grid gap-3">
                <ActionButton to="/contact" variant="gold">
                  Enroll Now
                </ActionButton>
                <ActionButton to="/contact" variant="outline">
                  Request Callback
                </ActionButton>
                <ActionButton variant="outline" onClick={handleDownloadBrochure}>
                  {downloading ? "Preparing…" : "Download Brochure"}
                </ActionButton>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-xl bg-teal/8 p-4">
                <Layers className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="text-xs font-semibold text-navy">Authorised Microsoft Learn Partner</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Delivered by APIONEER under our official Microsoft training partnership.
                  </p>
                </div>
              </div>
            </div>

            <InquiryForm
              title="Corporate enquiry"
              description="Running this for a team? Request a private cohort proposal."
              interests={[course.title, "Corporate Training", "Other certification"]}
              compact
            />
          </aside>
        </div>
      </section>
    </>
  );
}