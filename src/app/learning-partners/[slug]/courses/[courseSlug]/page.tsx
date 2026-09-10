import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, FileText, GraduationCap, Info, ListChecks, ShieldCheck, Timer } from "lucide-react";
import { learningPartners } from "@/data/partners";
import { partnerCourses } from "@/data/partner-courses";
import { microsoftCourses } from "@/data/microsoft-courses";
import { ActionButton, PageHero, Pill, SectionHeading } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";

const allPartnerCourses = [...partnerCourses, ...microsoftCourses];

export function generateStaticParams() {
  return allPartnerCourses.map((c) => ({ slug: c.partnerSlug, courseSlug: c.slug }));
}

type Props = { params: Promise<{ slug: string; courseSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = allPartnerCourses.find((c) => c.slug === courseSlug);
  if (!course) return { title: "Course not found — aPIONEER", robots: { index: false, follow: false } };
  const title = `${course.title} — aPIONEER`;
  return { title, description: course.tagline, openGraph: { title, description: course.tagline } };
}

export default async function PartnerCourseDetailPage({ params }: Props) {
  const { slug, courseSlug } = await params;
  const partner = learningPartners.find((p) => p.slug === slug);
  const course = allPartnerCourses.find((c) => c.slug === courseSlug && c.partnerSlug === slug);
  if (!partner || !course) notFound();

  const related = allPartnerCourses
    .filter((c) => c.slug !== course.slug && c.categorySlug === course.categorySlug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${partner.name} · ${course.category}`}
        title={course.title}
        description={course.tagline}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Learning Partners", to: "/learning-partners" },
          { label: partner.name, to: `/learning-partners/${partner.slug}` },
          { label: course.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <ActionButton to="/contact" variant="gold" size="lg">
            Enroll Now
          </ActionButton>
          <ActionButton href={`/api/brochure/${partner.slug}/${course.slug}`} variant="outline" size="lg">
            Download Brochure
          </ActionButton>
        </div>
      </PageHero>

      <section className="section-y container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: Clock, label: "Duration", value: course.duration },
                { icon: Timer, label: "Exam duration", value: course.examDuration },
                { icon: ShieldCheck, label: "Credential", value: course.credential },
                { icon: GraduationCap, label: "Partner", value: partner.name },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <m.icon className="h-4.5 w-4.5 text-teal" aria-hidden />
                  <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">{m.label}</p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-navy">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <SectionHeading eyebrow="Why attend" title="What this programme delivers" />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{course.whyAttend}</p>
              {course.prerequisites ? (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-teal/25 bg-teal/8 p-5">
                  <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal" aria-hidden />
                  <p className="text-sm leading-relaxed text-navy">
                    <span className="font-semibold">Prerequisites:</span> {course.prerequisites}
                  </p>
                </div>
              ) : null}
            </div>

            {course.whoShouldAttend.length > 0 ? (
              <div className="mt-14">
                <SectionHeading eyebrow="Who should attend" title="Designed for these roles" />
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {course.whoShouldAttend.map((a) => (
                    <li key={a} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal" aria-hidden />
                      <span className="text-sm leading-relaxed text-navy">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {course.agenda && course.agenda.length > 0 ? (
              <div className="mt-14">
                <SectionHeading eyebrow="Curriculum" title="Day-by-day agenda" />
                <ol className="mt-8 grid gap-4">
                  {course.agenda.map((day) => (
                    <li key={day.day} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                      <div className="flex items-baseline gap-3">
                        <span className="rounded-lg bg-navy px-3 py-1 font-display text-xs font-bold text-on-dark">
                          {day.day}
                        </span>
                        <h3 className="text-base font-semibold text-navy">{day.title}</h3>
                      </div>
                      {day.points.length > 0 ? (
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {day.points.map((p) => (
                            <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                              {p}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {course.learningObjectives.length > 0 ? (
              <div className="mt-14">
                <SectionHeading eyebrow="Learning objectives" title="You will be able to" />
                <ul className="mt-6 grid gap-3">
                  {course.learningObjectives.map((o) => (
                    <li key={o} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                      <ListChecks className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal" aria-hidden />
                      <span className="text-sm leading-relaxed text-navy">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {course.examDomains && course.examDomains.length > 0 ? (
              <div className="mt-14">
                <SectionHeading eyebrow="Exam" title="Exam domains" />
                <ul className="mt-6 grid gap-3">
                  {course.examDomains.map((d) => (
                    <li key={d} className="flex items-start gap-3 rounded-xl border border-gold/25 bg-gold/8 p-4">
                      <FileText className="mt-0.5 h-4.5 w-4.5 shrink-0 text-navy" aria-hidden />
                      <span className="text-sm leading-relaxed text-navy">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {course.certificationTable.length > 0 ? (
              <div className="mt-14">
                <SectionHeading eyebrow="Certification pathway" title="Credential requirements" />
                <div className="mt-6 overflow-x-auto rounded-2xl border border-border shadow-soft">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-navy text-on-dark">
                        <th className="px-5 py-3.5 font-semibold">Credential</th>
                        <th className="px-5 py-3.5 font-semibold">Professional experience</th>
                        <th className="px-5 py-3.5 font-semibold">Project experience</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.certificationTable.map((row, i) => (
                        <tr key={row.credential} className={i % 2 === 0 ? "bg-card" : "bg-surface"}>
                          <td className="px-5 py-3.5 font-semibold text-navy">{row.credential}</td>
                          <td className="px-5 py-3.5 text-muted-foreground">{row.professional}</td>
                          <td className="px-5 py-3.5 text-muted-foreground">{row.project}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {course.generalInfo.length > 0 ? (
              <div className="mt-14">
                <SectionHeading eyebrow="Good to know" title="General information" />
                <ul className="mt-6 grid gap-3">
                  {course.generalInfo.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-32 grid gap-6">
            <div className="rounded-3xl border border-border bg-surface-gradient p-7 shadow-card">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-soft">Credential</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-navy">{course.credential}</p>
              <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                  {course.duration} training
                </li>
                <li className="flex items-start gap-2.5">
                  <Timer className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                  {course.examDuration} exam
                </li>
              </ul>
              <div className="mt-7 grid gap-3">
                <ActionButton to="/contact" variant="gold">
                  Enroll Now
                </ActionButton>
                <ActionButton href={`/api/brochure/${partner.slug}/${course.slug}`} variant="outline">
                  Download Brochure
                </ActionButton>
                <ActionButton to="/contact" variant="outline">
                  Request Callback
                </ActionButton>
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

      {related.length > 0 ? (
        <section className="bg-surface section-y">
          <div className="container-x">
            <SectionHeading
              eyebrow="Related certifications"
              title={`More in ${course.category}`}
              action={
                <ActionButton to={`/learning-partners/${partner.slug}`} variant="outline" size="lg">
                  All {partner.name} programmes
                </ActionButton>
              }
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((c) => (
                <a
                  key={c.slug}
                  href={`/learning-partners/${c.partnerSlug}/courses/${c.slug}`}
                  className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <Pill tone="gold">{c.category}</Pill>
                  <h3 className="mt-4 text-pretty text-lg leading-snug text-navy link-underline">{c.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}