"use client";

import { useState } from "react";

type Props = {
  onSubmit: (data: Record<string, unknown>) => void;
  initial?: Record<string, unknown>;
};

export function WebinarForm({ onSubmit, initial }: Props) {
  const [form, setForm] = useState({
    title: (initial?.title as string) || "",
    slug: (initial?.slug as string) || "",
    date: initial?.date ? String(initial.date).slice(0, 10) : "",
    time: (initial?.time as string) || "",
    speaker: (initial?.speaker as string) || "",
    role: (initial?.role as string) || "",
    duration: (initial?.duration as string) || "",
    blurb: (initial?.blurb as string) || "",
    registrationUrl: (initial?.registrationUrl as string) || "",
    published: initial?.published !== undefined ? Boolean(initial.published) : true,
  });

  function update(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      registrationUrl: form.registrationUrl || null,
      date: new Date(form.date).toISOString(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-2xl gap-5 rounded-2xl border border-slate-200 bg-white p-6">
      <Field label="Title">
        <input required value={form.title} onChange={(e) => update("title", e.target.value)} className="input" />
      </Field>
      <Field label="Slug (URL-friendly, unique)">
        <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className="input" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Date">
          <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="input" />
        </Field>
        <Field label="Time">
          <input required value={form.time} onChange={(e) => update("time", e.target.value)} className="input" placeholder="16:00 IST" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Speaker">
          <input required value={form.speaker} onChange={(e) => update("speaker", e.target.value)} className="input" />
        </Field>
        <Field label="Speaker Role">
          <input required value={form.role} onChange={(e) => update("role", e.target.value)} className="input" />
        </Field>
      </div>
      <Field label="Duration">
        <input required value={form.duration} onChange={(e) => update("duration", e.target.value)} className="input" placeholder="60 min" />
      </Field>
      <Field label="Blurb">
        <textarea required value={form.blurb} onChange={(e) => update("blurb", e.target.value)} className="input" rows={3} />
      </Field>
      <Field label="Registration URL (optional)">
        <input value={form.registrationUrl} onChange={(e) => update("registrationUrl", e.target.value)} className="input" placeholder="https://..." />
      </Field>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
        Published
      </label>
      <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
        Save
      </button>
      <style jsx>{`
        .input {
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #64748b;
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}