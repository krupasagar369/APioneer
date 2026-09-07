import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, ListChecks, Star, Users, Video } from "lucide-react";
import { courses } from "@/data/site";
import { ActionButton, CtaBand, PageHero, Pill, SectionHeading } from "@/components/site/ui";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: "Course not found — APioneer", robots: { index: false, follow: false } };
  const title = `${course.title} — APioneer`;
  return { title, description: course.summary, openGraph: { title, description: course.summary } };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <PageHero
        eyebrow={course.partner}
        title={course.title}
        description={course.summary}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Courses", to: "/courses" },
          { label: course.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton to="/contact" variant="gold" size="lg">
            Talk to an Expert
          </ActionButton>
          <span className="inline-flex items-center gap-2 rounded-xl border border-navy/20 px-5 py-3.5 text-sm font-semibold text-navy">
            {course.price}
          </span>
        </div>
      </PageHero>

      <section className="section-y container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0">
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                { icon: Clock, label: "Duration", value: course.duration },
                { icon: Video, label: "Mode", value: course.mode },
                { icon: Users, label: "Learners", value: `${course.learners}+` },
                { icon: Star, label: "Rating", value: `${course.rating.toFixed(1)} / 5` },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <m.icon className="h-4.5 w-4.5 text-teal" aria-hidden />
                  <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">{m.label}</p>
                  <p className="mt-1 text-sm font-semibold text-navy">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="Curriculum" title="What's covered" />
              <div className="mt-6 grid gap-4">
                {course.modules.map((m, i) => (
                  <div key={m.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-gradient text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy">{m.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="flex items-center gap-2 text-xl text-navy">
                <ListChecks className="h-5 w-5 text-teal" aria-hidden />
                Learning outcomes
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-navy">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 grid gap-6">
            <div className="rounded-3xl border border-border bg-surface-gradient p-7 shadow-card">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-soft">Credential</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-navy">{course.title}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill tone="gold">{course.level}</Pill>
                <Pill>{course.category}</Pill>
                <Pill tone="teal">{course.price}</Pill>
              </div>
              <div className="mt-7 grid gap-3">
                <ActionButton to="/contact" variant="gold">
                  Enroll Now
                </ActionButton>
                <ActionButton to="/contact" variant="outline">
                  Request Callback
                </ActionButton>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-semibold text-navy">Who this is for</h3>
              <ul className="mt-4 grid gap-2">
                {course.audience.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Ready to enroll in ${course.title}?`}
        description="Speak with a senior learning advisor about cohort dates, corporate pricing and exam readiness support."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Browse all courses", to: "/courses" }}
      />
    </>
  );
}