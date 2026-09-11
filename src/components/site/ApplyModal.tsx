"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Upload, X } from "lucide-react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_BYTES = 25 * 1024 * 1024; // 25MB

const applySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  contact: z
    .string()
    .trim()
    .min(7, "Enter a valid contact number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid contact number"),
  linkedin: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^https?:\/\/.*linkedin\.com\/.+/i.test(v), "Enter a valid LinkedIn profile URL"),
  resume: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Please upload your resume")
    .refine((files) => !files?.[0] || ACCEPTED_TYPES.includes(files[0].type), "Only PDF, DOC or DOCX files are accepted")
    .refine((files) => !files?.[0] || files[0].size <= MAX_SIZE_BYTES, "File must be 25MB or smaller"),
});

type ApplyValues = z.infer<typeof applySchema>;

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-soft outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-teal focus:ring-4 focus:ring-teal/15";
const labelCls = "mb-2 block text-xs font-semibold uppercase tracking-wider text-navy-soft";
const errorCls = "mt-1.5 text-xs font-medium text-destructive";

export function ApplyModal({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  const [fileName, setFileName] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ApplyValues>({ resolver: zodResolver(applySchema) });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const onSubmit = async (values: ApplyValues) => {
    // NOTE: no backend/applications API exists yet — this validates and previews
    // the submission only. Once the Application model + file storage (S3-compatible)
    // + API route are built, replace this with a real multipart upload POST request.
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Application submitted (not yet persisted):", {
      ...values,
      resumeFileName: values.resume?.[0]?.name,
      jobTitle,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button type="button" aria-label="Close application form" onClick={onClose} className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg animate-fade-up overflow-hidden rounded-3xl bg-card shadow-lift">
        <div className="relative bg-navy-gradient px-7 py-6">
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, oklch(0.79 0.132 82 / 0.5), transparent 70%)" }}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-on-dark transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
          <p className="relative text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold">Apply now</p>
          <h2 className="relative mt-2 text-xl font-semibold text-on-dark">{jobTitle}</h2>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-7 py-7">
          {isSubmitSuccessful ? (
            <div className="flex flex-col items-center py-6 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-teal/15">
                <CheckCircle2 className="h-7 w-7 text-teal" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy">Application received</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Thank you for applying for <span className="font-medium text-navy">{jobTitle}</span>. Our talent team will
                review your profile and reach out if there's a fit.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-on-dark transition-colors hover:bg-navy-deep"
              >
                Close
              </button>
            </div>
          ) : (
            <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <label className={labelCls} htmlFor="apply-name">
                  Name *
                </label>
                <input
                  id="apply-name"
                  placeholder="Your full name"
                  className={inputCls}
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name ? <p className={errorCls}>{errors.name.message}</p> : null}
              </div>

              <div>
                <label className={labelCls} htmlFor="apply-email">
                  Email Address *
                </label>
                <input
                  id="apply-email"
                  type="email"
                  placeholder="you@example.com"
                  className={inputCls}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email ? <p className={errorCls}>{errors.email.message}</p> : null}
              </div>

              <div>
                <label className={labelCls} htmlFor="apply-contact">
                  Contact *
                </label>
                <input
                  id="apply-contact"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className={inputCls}
                  aria-invalid={!!errors.contact}
                  {...register("contact")}
                />
                {errors.contact ? <p className={errorCls}>{errors.contact.message}</p> : null}
              </div>

              <div>
                <label className={labelCls} htmlFor="apply-linkedin">
                  LinkedIn Profile URL
                </label>
                <input
                  id="apply-linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/your-profile"
                  className={inputCls}
                  aria-invalid={!!errors.linkedin}
                  {...register("linkedin")}
                />
                {errors.linkedin ? <p className={errorCls}>{errors.linkedin.message}</p> : null}
              </div>

              <div>
                <label className={labelCls} htmlFor="apply-resume">
                  Upload Your Resume *
                </label>
                <label
                  htmlFor="apply-resume"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-teal/40 bg-teal/5 px-4 py-7 text-center transition-colors hover:border-teal hover:bg-teal/10"
                >
                  <Upload className="h-6 w-6 text-teal" aria-hidden />
                  <span className="text-sm font-semibold text-navy">
                    {fileName || "Click to upload or drag and drop"}
                  </span>
                  <span className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX (Max 25MB)</span>
                </label>
                <input
                  id="apply-resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  {...register("resume", {
                    onChange: (e) => setFileName(e.target.files?.[0]?.name ?? ""),
                  })}
                />
                {errors.resume ? <p className={errorCls}>{errors.resume.message as string}</p> : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-3.5 text-sm font-bold text-navy-deep shadow-soft transition-transform duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
              >
                {isSubmitting ? "Submitting…" : "Submit Application"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                By applying, you agree to our processing of your data for recruitment purposes.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}