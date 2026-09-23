import type { Metadata } from "next";
import { CalendarDays, MapPin, Users2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ActionButton, CtaBand, PageHero, Pill } from "@/components/site/ui";

const title = "Workshops";
const description = "Hands-on intensives, capped for depth — small-cohort labs where teams solve real problems with practitioners in the room.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

// Fetch on every request instead of prerendering at build time — the
// database isn't reachable during the build step.
export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

export default async function WorkshopsPage() {
  const workshops = await prisma.workshop.findMany({
    where: { published: true, date: { gte: new Date() } },
    orderBy: { date: "asc" },
  });

  return (
    <>
      <PageHero
        eyebrow="Training"
        title="Workshops"
        description="Hands-on intensives, capped for depth. Small-cohort labs where teams solve real problems with practitioners in the room."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Workshops" }]}
      >
        <ActionButton to="/contact" variant="gold" size="lg">
          Talk to an Expert
        </ActionButton>
      </PageHero>

      <section className="section-y container-x">
        {workshops.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {workshops.map((w) => (
              <div key={w.id} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Pill tone="gold">{w.focus}</Pill>
                <h3 className="mt-4 text-pretty text-lg leading-snug text-navy">{w.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{w.blurb}</p>
                <div className="mt-5 grid gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-teal" aria-hidden />
                    {formatDate(w.date)} · {w.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-teal" aria-hidden />
                    {w.city} · {w.format}
                  </div>
                  {w.seats ? (
                    <div className="flex items-center gap-2">
                      <Users2 className="h-3.5 w-3.5 text-teal" aria-hidden />
                      {w.seats} seats
                    </div>
                  ) : null}
                </div>
                <div className="mt-6">
                  <ActionButton to="/contact" variant="outline" size="md">
                    Reserve a Seat
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-sm font-semibold text-navy">No workshops scheduled right now</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Check back soon, or talk to us about running a private workshop for your team.
            </p>
            <div className="mt-5">
              <ActionButton to="/contact" variant="outline">
                Talk to an Expert
              </ActionButton>
            </div>
          </div>
        )}
      </section>

      <CtaBand
        title="Want a private workshop for your team?"
        description="We can run any of our intensives as a closed cohort for your organisation, onsite or live virtual."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "See upcoming webinars", to: "/workshops" }}
      />
    </>
  );
}