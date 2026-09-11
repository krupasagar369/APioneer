import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careers } from "@/data/site";
import { PageHero, Pill, SectionHeading } from "@/components/site/ui";
import { JobDetailClient } from "./JobDetailClient";

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = careers.find((c) => c.slug === slug);
  if (!job) return { title: "Role not found — aPIONEER", robots: { index: false, follow: false } };
  const title = `${job.title} — Careers at aPIONEER`;
  return { title, description: job.blurb, openGraph: { title, description: job.blurb } };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = careers.find((c) => c.slug === slug);
  if (!job) notFound();

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.about ?? job.blurb,
    datePosted: job.datePosted ?? new Date().toISOString().slice(0, 10),
    validThrough: job.validThrough,
    employmentType: job.employmentType ?? "FULL_TIME",
    hiringOrganization: { "@type": "Organization", name: "aPIONEER Business Solutions", sameAs: "https://apioneer.com" },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }} />

      <PageHero
        eyebrow={job.team}
        title={job.title}
        description={job.blurb}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: job.title }]}
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="teal">{job.location}</Pill>
          <Pill>{job.type}</Pill>
          <Pill>{job.exp}</Pill>
        </div>
      </PageHero>

      <section className="section-y container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0">
            {job.about ? (
              <div>
                <SectionHeading eyebrow="About the role" title="What you'll be doing" />
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">{job.about}</p>
              </div>
            ) : null}

            {job.responsibilities?.length ? (
              <div className="mt-14">
                <h2 className="text-2xl text-navy">Responsibilities</h2>
                <ul className="mt-6 grid gap-3">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                      <span className="text-sm leading-relaxed text-navy">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {job.requirements?.length ? (
              <div className="mt-14">
                <h2 className="text-2xl text-navy">What we're looking for</h2>
                <ul className="mt-6 grid gap-3">
                  {job.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      <span className="text-sm leading-relaxed text-navy">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {job.niceToHave?.length ? (
              <div className="mt-14">
                <h2 className="text-2xl text-navy">Nice to have</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.niceToHave.map((n) => (
                    <Pill key={n}>{n}</Pill>
                  ))}
                </div>
              </div>
            ) : null}

            {job.benefits?.length ? (
              <div className="mt-14">
                <h2 className="text-2xl text-navy">What you'll get</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {job.benefits.map((b) => (
                    <li key={b} className="rounded-xl border border-teal/25 bg-teal/8 p-4 text-sm text-navy">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-32">
            <JobDetailClient jobTitle={job.title} />
          </aside>
        </div>
      </section>
    </>
  );
}