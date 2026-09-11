"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { ApplyModal } from "@/components/site/ApplyModal";

export function JobDetailClient({ jobTitle }: { jobTitle: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-3xl border border-border bg-navy-gradient p-7 shadow-card">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold">Ready to apply?</p>
        <h3 className="mt-2 text-lg font-semibold text-on-dark">{jobTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">
          Share your details and resume — our talent team typically responds within one week.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-3.5 text-sm font-bold text-navy-deep shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
        >
          Apply Now
          <Send className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {open ? <ApplyModal jobTitle={jobTitle} onClose={() => setOpen(false)} /> : null}
    </>
  );
}