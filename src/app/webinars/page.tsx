import type { Metadata } from "next";
import { CalendarDays, Clock, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ActionButton, CtaBand, PageHero } from "@/components/site/ui";

const title = "Webinars";
const description = "Free live sessions with our practice leads — focused minutes on the questions enterprise teams are actually wrestling with.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

export default async function WebinarsPage() {
  const webinars = await prisma.webinar.findMany({
    where: { published: true, date: { gte: new Date() } },
    orderBy: { date: "asc" },
  });

  return (
    <>
      <PageHero
        eyebrow="Training"
        title="Webinars"
        description="Free live sessions with our practice leads — focused time on the questions enterprise teams are actually wrestling with."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Webinars" }]}
      >
        <ActionButton to="/contact" variant="gold" size="lg">
          Talk to an Expert
        </ActionButton>
      </PageHero>

      <section className="section-y container-x">
        {webinars.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {webinars.map((w) => (
              <div key={w.id} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-pretty text-base leading-snug text-navy">{w.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{w.blurb}</p>
                <div className="mt-5 grid gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-teal" aria-hidden />
                    {formatDate(w.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-teal" aria-hidden />
                    {w.time} · {w.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-teal" aria-hidden />
                    {w.speaker}, {w.role}
                  </div>
                </div>
                <div className="mt-6">
                  {w.registrationUrl ? (
                    <a
                      href={w.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:border-teal hover:bg-teal/8"
                    >
                      Register Free
                    </a>
                  ) : (
                    <ActionButton to="/contact" variant="outline" size="md">
                      Register Interest
                    </ActionButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-sm font-semibold text-navy">No webinars scheduled right now</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Check back soon, or tell us a topic you&apos;d like us to cover.
            </p>
            <div className="mt-5">
              <ActionButton to="/contact" variant="outline">
                Suggest a Topic
              </ActionButton>
            </div>
          </div>
        )}
      </section>

      <CtaBand
        title="Have a topic you want covered?"
        description="Tell us what your team is wrestling with and we'll consider it for an upcoming session."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "See upcoming workshops", to: "/workshops" }}
      />
    </>
  );
}