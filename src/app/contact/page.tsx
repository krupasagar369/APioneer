import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";

const title = "Contact Us — APioneer";
const description =
  "Get in touch with APioneer about corporate training, certification programmes or partnership enquiries.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const contactDetails = [
  { icon: Phone, label: "Phone", value: "+91 1800 000 000", href: "tel:+911800000000" },
  { icon: Mail, label: "Email", value: "info@apioneer.com", href: "mailto:info@apioneer.com" },
  { icon: MapPin, label: "Office", value: "Nagarbhavi 2nd Stage, Bangalore, Karnataka, India — 560091" },
  { icon: Clock, label: "Business hours", value: "Monday – Friday, 9:30 AM – 6:30 PM IST" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        description="Tell us what you're trying to solve — a training need, a certification goal, or a partnership enquiry — and a member of our team will get back to you within one business day."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="section-y container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <SectionHeading eyebrow="Reach us directly" title="Ways to connect" />
            <div className="mt-8 grid gap-4">
              {contactDetails.map((c) => (
                <div key={c.label} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal/12 text-navy">
                    <c.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-1 block text-sm font-medium text-navy hover:text-teal">
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <InquiryForm
            title="Send us a message"
            description="Share a few details and a senior advisor will follow up — no obligation, no scripted sales call."
            interests={[
              "Corporate Training",
              "Government Training",
              "Professional Certification",
              "IT Consulting",
              "Technical Upskilling",
              "Partnership Enquiry",
              "Other",
            ]}
          />
        </div>
      </section>
    </>
  );
}