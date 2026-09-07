"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { ActionButton } from "./ui";

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-soft outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-teal focus:ring-4 focus:ring-teal/15";

const labelCls = "mb-2 block text-xs font-semibold uppercase tracking-wider text-navy-soft";

const errorCls = "mt-1.5 text-xs font-medium text-destructive";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid work email"),
  company: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  interest: z.string().trim().min(1, "Please select an area of interest"),
  message: z.string().trim().optional(),
});

type InquiryValues = z.infer<typeof inquirySchema>;

export function InquiryForm({
  title = "Talk to an Expert",
  description = "Share a few details and a learning advisor will respond within one business day.",
  interests = [
    "Corporate Training",
    "Professional Certification",
    "Government Training",
    "IT Consulting",
    "Workshops & Webinars",
  ],
  compact = false,
}: {
  title?: string;
  description?: string;
  interests?: string[];
  compact?: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { interest: interests[0] },
  });

  const onSubmit = async (values: InquiryValues) => {
    // NOTE: no backend/leads API exists yet — this is validated client-side only.
    // Once the Lead model + API route are built, replace this with a real POST request.
    await new Promise((resolve) => setTimeout(resolve, 400));
    console.log("Inquiry submitted (not yet persisted):", values);
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-3xl border border-border bg-card p-7 shadow-card md:p-9">
        <h3 className="text-2xl text-navy">{title}</h3>
        <div
          role="status"
          className="mt-7 flex items-start gap-3 rounded-2xl border border-teal/30 bg-teal/10 p-5 text-sm text-navy"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden />
          <p>
            Thank you — your enquiry has been recorded. A senior learning advisor will contact you within one business
            day with a tailored proposal.
          </p>
        </div>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 text-xs font-semibold text-navy underline-offset-4 hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-7 shadow-card md:p-9">
      <h3 className="text-2xl text-navy">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <form className="mt-7 grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
          <div>
            <label className={labelCls} htmlFor="if-name">
              Full name
            </label>
            <input
              id="if-name"
              placeholder="Priya Sharma"
              className={inputCls}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "if-name-error" : undefined}
              {...register("name")}
            />
            {errors.name ? (
              <p id="if-name-error" className={errorCls}>
                {errors.name.message}
              </p>
            ) : null}
          </div>
          <div>
            <label className={labelCls} htmlFor="if-email">
              Work email
            </label>
            <input
              id="if-email"
              type="email"
              placeholder="priya@company.com"
              className={inputCls}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "if-email-error" : undefined}
              {...register("email")}
            />
            {errors.email ? (
              <p id="if-email-error" className={errorCls}>
                {errors.email.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
          <div>
            <label className={labelCls} htmlFor="if-company">
              Organisation
            </label>
            <input id="if-company" placeholder="Company or department" className={inputCls} {...register("company")} />
          </div>
          <div>
            <label className={labelCls} htmlFor="if-phone">
              Phone
            </label>
            <input id="if-phone" type="tel" placeholder="+91 98765 43210" className={inputCls} {...register("phone")} />
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="if-interest">
            Area of interest
          </label>
          <select id="if-interest" className={inputCls} {...register("interest")}>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
          {errors.interest ? <p className={errorCls}>{errors.interest.message}</p> : null}
        </div>

        <div>
          <label className={labelCls} htmlFor="if-message">
            How can we help?
          </label>
          <textarea
            id="if-message"
            rows={4}
            placeholder="Team size, target skills, preferred timelines…"
            className={`${inputCls} resize-y`}
            {...register("message")}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <ActionButton type="submit" variant="gold" size="lg" className={isSubmitting ? "pointer-events-none opacity-70" : ""}>
            {isSubmitting ? "Submitting…" : "Submit enquiry"}
          </ActionButton>
          <p className="text-xs text-muted-foreground">We reply within one business day. No spam, ever.</p>
        </div>
      </form>
    </div>
  );
}