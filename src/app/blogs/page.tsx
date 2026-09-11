import type { Metadata } from "next";
import { blogs } from "@/data/site";
import { ActionButton, CtaBand, PageHero, SectionHeading } from "@/components/site/ui";
import { BlogCard } from "@/components/site/cards";
import { Reveal } from "@/components/site/Stats";

const title = "Blogs & Insights on Enterprise Learning | aPIONEER";
const description =
  "Research and perspective on capability building, certification ROI, AI upskilling, compliance and learning design.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function BlogsPage() {
  const [lead, ...rest] = blogs;
  const categories = [...new Set(blogs.map((b) => b.category))];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "aPIONEER Insights",
    description,
    blogPost: blogs.map((b) => ({
      "@type": "BlogPosting",
      headline: b.title,
      description: b.excerpt,
      author: { "@type": "Person", name: b.author },
      datePublished: b.date,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />

      <PageHero
        eyebrow="Insights"
        title="Perspective from the people delivering the work"
        description="Research, field notes and practical guidance from our consulting and faculty teams."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blogs" }]}
      />

      {categories.length > 1 ? (
        <section className="container-x pt-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-navy"
              >
                {c}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-y container-x">
        <SectionHeading eyebrow="Featured" title={lead.title} description={lead.excerpt} />
        <div className="mt-6">
          <BlogCard item={lead} />
        </div>

        {rest.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((b, i) => (
              <Reveal key={b.slug} delay={i * 60}>
                <BlogCard item={b} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      <CtaBand
        title="Get our monthly briefing"
        description="Research, certification updates and capability benchmarks for technology and L&D leaders."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Browse Resources", to: "/resources" }}
      />
    </>
  );
}