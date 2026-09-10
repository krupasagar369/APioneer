"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Book,
  Box,
  Clock,
  FileText,
  Info,
  Layers,
  ListChecks,
  Loader2,
  Share2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { inferLevel, stripHtml } from "@/lib/integrations/ai-certs/client";
import type { AiCertsCourseFull, AiCertsCourseFullResponse } from "@/lib/integrations/ai-certs/types";
import { ActionButton, PageHero, Pill } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";
import { downloadGeneratedBrochure } from "@/lib/pdf/downloadGeneratedBrochure";

// Fetched client-side from the AI CERTs partner API's single-course endpoint, which
// returns the full syllabus (certificate overview, modules, tools) — a different,
// richer endpoint than the one used for the catalogue list.
const API_BASE_URL = "https://www.aicerts.ai/wp-json/aicerts-api/v1";

type LoadState = "loading" | "notfound" | "ready";

export function AiCertCourseDetail({ id, partnerName }: { id: string; partnerName: string }) {
  const [course, setCourse] = useState<AiCertsCourseFull | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/course/${id}`);
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as AiCertsCourseFullResponse;
        if (!json?.success || !json.data) throw new Error("no data");
        if (!cancelled) {
          setCourse(json.data);
          setState("ready");
        }
      } catch (err) {
        console.error(`[ai-certs] course detail fetch failed for id ${id}:`, err);
        if (!cancelled) setState("notfound");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (state === "loading") {
    return (
      <section className="section-y container-x">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-teal" aria-hidden />
          Loading certification details…
        </div>
      </section>
    );
  }

  if (state === "notfound" || !course) {
    notFound();
    return null;
  }

  const courseTitle = stripHtml(course.title);
  const tagline = stripHtml(course.course_tagline);
  const level = inferLevel(courseTitle);
  const ov = course.certificate_overview ?? {};
  const modules = course.certification_modules ?? [];
  const tools = course.ai_tools ?? [];
  const badgeUrl = course.certificate_badge_url || course.feature_image_url || "";
  const category = course.categories && course.categories[0];

  const overviewItems = [
    ov.included_items && { icon: Box, label: "What's Included", value: ov.included_items },
    ov.certificate_duration && { icon: Clock, label: "Certificate Duration", value: ov.certificate_duration },
    ov.prerequisites && { icon: ListChecks, label: "Prerequisites", value: ov.prerequisites },
    ov.exam_format && { icon: FileText, label: "Exam Format", value: ov.exam_format },
  ].filter(Boolean) as { icon: typeof Box; label: string; value: string }[];

  async function handleDownloadBrochure() {
    setDownloading(true);
    const result = await downloadGeneratedBrochure({
      title: courseTitle,
      partner: partnerName,
      category: category || undefined,
      credential: course.certificate_code || undefined,
      duration: ov.certificate_duration ? stripHtml(ov.certificate_duration) : undefined,
      intro: course.description ? stripHtml(course.description) : tagline || undefined,
      objectives: modules.map((m) => m.certification_module_title).filter((t): t is string => Boolean(t)),
      prerequisites: ov.prerequisites ? [stripHtml(ov.prerequisites)] : undefined,
    });
    if (!result.ok) {
      console.error("[ai-certs] brochure download failed:", result.error);
    }
    setDownloading(false);
  }

  return (
    <>
      <PageHero
        eyebrow={`${partnerName} · AI Certification`}
        title={courseTitle}
        description={tagline || "An applied AI certification delivered by AI CERTs."}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Learning Partners", to: "/learning-partners" },
          { label: partnerName, to: "/learning-partners/ai-cert" },
          { label: courseTitle },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="gold">{level.charAt(0).toUpperCase() + level.slice(1)} Level</Pill>
          {ov.certificate_duration ? <Pill>{stripHtml(ov.certificate_duration)}</Pill> : null}
          {course.certificate_code ? <Pill>{course.certificate_code}</Pill> : null}
          <Pill tone="teal">
            <ShieldCheck className="mr-1 inline h-3 w-3" aria-hidden />
            Blockchain Verified
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
            {/* About This Course */}
            {course.description ? (
              <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 text-xl text-navy">
                  <Info className="h-5 w-5 text-teal" aria-hidden />
                  About This Course
                </h2>
                <div
                  className="prose prose-sm mt-4 max-w-none text-muted-foreground [&_a]:text-teal [&_li]:mb-1 [&_strong]:text-navy"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
              </div>
            ) : null}

            {/* Certificate Overview */}
            {overviewItems.length ? (
              <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 text-xl text-navy">
                  <ListChecks className="h-5 w-5 text-teal" aria-hidden />
                  Certificate Overview
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {overviewItems.map((item) => (
                    <div key={item.label} className="rounded-xl bg-background p-4">
                      <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">
                        <item.icon className="h-3.5 w-3.5" aria-hidden />
                        {item.label}
                      </p>
                      {/\s*<(ul|ol|p|div)[\s>]/i.test(item.value) ? (
                        <div
                          className="prose prose-sm mt-1.5 max-w-none text-sm leading-relaxed text-navy [&_p]:m-0 [&_ul]:my-0 [&_ul]:list-disc [&_ul]:pl-4"
                          dangerouslySetInnerHTML={{ __html: item.value }}
                        />
                      ) : (
                        <p className="mt-1.5 text-sm leading-relaxed text-navy">{stripHtml(item.value)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Prerequisites callout */}
            {ov.prerequisites ? (
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-6">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-navy">Prerequisites</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy/80">{stripHtml(ov.prerequisites)}</p>
                </div>
              </div>
            ) : null}

            {/* Certification Modules */}
            {modules.length ? (
              <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 text-xl text-navy">
                  <Book className="h-5 w-5 text-teal" aria-hidden />
                  Certification Modules
                  <span className="text-sm font-normal text-muted-foreground">{modules.length} modules</span>
                </h2>
                <div className="mt-5 divide-y divide-border">
                  {modules.map((m, i) => (
                    <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                        {i + 1}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-navy">
                          {m.certification_module_title || `Module ${i + 1}`}
                        </h3>
                        {m.certification_module_description ? (
                          <div
                            className="prose prose-sm mt-1 max-w-none text-sm text-muted-foreground [&_li]:mb-1"
                            dangerouslySetInnerHTML={{ __html: m.certification_module_description }}
                          />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Tools & Technologies */}
            {tools.length ? (
              <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 text-xl text-navy">
                  <Wrench className="h-5 w-5 text-teal" aria-hidden />
                  Tools &amp; Technologies Covered
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {tools.map((t, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center"
                    >
                      {t.tool_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={t.tool_image}
                          alt={t.name || "Tool"}
                          width={40}
                          height={40}
                          className="h-10 w-10 object-contain"
                        />
                      ) : (
                        <Wrench className="h-8 w-8 text-teal" aria-hidden />
                      )}
                      <span className="text-xs font-semibold text-navy">{t.name || "Tool"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-8 rounded-2xl border border-teal/25 bg-teal/8 p-6 text-sm leading-relaxed text-navy">
              Content on this page is fetched live from the AI CERTs platform. For the most current syllabus, exam
              format and pricing, our advisors can confirm full details when you enquire.
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 grid gap-6">
            <div className="rounded-3xl border border-border bg-surface-gradient p-7 shadow-card">
              {badgeUrl ? (
                <div className="mb-5 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={badgeUrl}
                    alt={`${courseTitle} badge`}
                    width={140}
                    height={140}
                    className="h-auto w-32 object-contain"
                  />
                </div>
              ) : null}
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-soft">Credential</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-navy">{courseTitle}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill tone="gold">{level.charAt(0).toUpperCase() + level.slice(1)} level</Pill>
                {category ? <Pill>{category}</Pill> : null}
                {course.certification_price ? <Pill tone="teal">{course.certification_price}</Pill> : null}
              </div>
              {course.certificate_code ? (
                <div className="mt-5 rounded-xl border border-border bg-background px-4 py-3">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-navy-soft">Certificate Code</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-navy">{course.certificate_code}</p>
                </div>
              ) : null}
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
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="text-xs font-semibold text-navy">Blockchain Verified Certification</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Tamper-proof, lifetime-valid certification secured on the blockchain.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-navy">
                <Layers className="h-4 w-4 text-teal" aria-hidden />
                Share This Course
              </h3>
              <div className="mt-4 flex gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#0077b5]/40 px-3 py-2 text-xs font-semibold text-[#0077b5] transition-colors hover:bg-[#0077b5] hover:text-white"
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden />
                  LinkedIn
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${courseTitle} – ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#25d366]/40 px-3 py-2 text-xs font-semibold text-[#25d366] transition-colors hover:bg-[#25d366] hover:text-white"
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </div>

            <InquiryForm
              title="Corporate enquiry"
              description="Running this for a team? Request a private cohort proposal."
              interests={[courseTitle, "Corporate Training", "Other certification"]}
              compact
            />
          </aside>
        </div>
      </section>
    </>
  );
}