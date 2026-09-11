import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { careers } from "@/data/site";
import { CtaBand, PageHero, Pill, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Stats";

const title = "Careers at aPIONEER Business Solutions";
const description =
  "Join a global enterprise learning and consulting firm. Open roles across delivery, consulting, growth and design.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

const perks = [
  { t: "Practitioner time", d: "Faculty spend part of each year on live client engagements." },
  { t: "Learning budget", d: "Annual certification and conference allowance for every employee." },
  { t: "Global exposure", d: "Delivery across India, GCC, APAC and EMEA." },
  { t: "Flexible working", d: "Hybrid and remote roles with regional delivery hubs." },
];

const faqs = [
  { q: "Does aPIONEER hire remote employees?", a: "Yes. Most roles support hybrid or fully remote work, coordinated through our regional delivery hubs." },
  { q: "What is the interview process like?", a: "Typically a recruiter screen, a practical round relevant to the role, and a final conversation with the hiring lead." },
  { q: "Can I apply if there's no matching role?", a: "Yes — we review speculative applications every month and reach out when a matching role opens." },
];

// Rotating accent palette so the 3-column grid reads as vibrant, not monotone.
const accents = [
  "from-navy to-teal",
  "from-teal to-navy-soft",
  "from-gold to-gold-soft",
  "from-navy-soft to-navy-deep",
  "from-teal to-gold",
  "from-navy-deep to-teal",
];

export default function CareersPage() {
  const jobPostingsJsonLd = careers.map((c) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: c.title,
    description: c.blurb,
    datePosted: c.datePosted ?? new Date().toISOString().slice(0, 10),
    validThrough: c.validThrough,
    employmentType: c.employmentType ?? "FULL_TIME",
    hiringOrganization: { "@type": "Organization", name: "aPIONEER Business Solutions", sameAs: "https://apioneer.com" },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: c.location } },
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingsJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero
        eyebrow="Careers"
        title="Build the capability layer of the modern enterprise"
        description="We hire practitioners who teach and teachers who practise. If you care about doing this properly, we would like to meet you."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Careers" }]}
      />

      <section className="section-y container-x">
        <SectionHeading eyebrow="Why aPIONEER" title="What working here looks like" align="center" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {perks.map((b) => (
            <article key={b.t} className="card-lift rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-base font-semibold text-navy">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Open roles" title={`${careers.length} positions open`} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {careers.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <Link
                  href={`/careers/${c.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${accents[i % accents.length]}`} />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <Pill tone="teal">{c.team}</Pill>
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${accents[i % accents.length]} text-white shadow-soft`}
                      >
                        <Briefcase className="h-5 w-5" aria-hidden />
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg leading-snug text-navy transition-colors group-hover:text-teal">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-teal" aria-hidden />
                        {c.location}
                      </span>
                      <span>·</span>
                      <span>{c.type}</span>
                      <span>·</span>
                      <span>{c.exp}</span>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                      View role & apply
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y container-x">
        <SectionHeading eyebrow="Before you apply" title="Frequently asked questions" />
        <div className="mt-10 grid max-w-3xl gap-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card p-6 shadow-soft open:shadow-card">
              <summary className="cursor-pointer list-none text-base font-semibold text-navy marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <span aria-hidden className="shrink-0 text-teal transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand
        title="Nothing matching your profile?"
        description="Send us your details anyway — we review speculative applications every month."
        primary={{ label: "Contact our team", to: "/contact" }}
        secondary={{ label: "About aPIONEER", to: "/about" }}
      />
    </>
  );
}