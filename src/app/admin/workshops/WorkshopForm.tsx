"use client";

import { useState } from "react";

type Props = {
  onSubmit: (data: Record<string, unknown>) => void;
  initial?: Record<string, unknown>;
};

export function WorkshopForm({ onSubmit, initial }: Props) {
  const [form, setForm] = useState({
    title: (initial?.title as string) || "",
    slug: (initial?.slug as string) || "",
    date: initial?.date ? String(initial.date).slice(0, 10) : "",
    city: (initial?.city as string) || "",
    format: (initial?.format as string) || "In-person",
    seats: initial?.seats != null ? String(initial.seats) : "",
    duration: (initial?.duration as string) || "",
    focus: (initial?.focus as string) || "",
    blurb: (initial?.blurb as string) || "",
    published: initial?.published !== undefined ? Boolean(initial.published) : true,
  });

  function update(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      seats: form.seats ? Number(form.seats) : null,
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
        <Field label="City">
          <input required value={form.city} onChange={(e) => update("city", e.target.value)} className="input" />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Format">
          <select value={form.format} onChange={(e) => update("format", e.target.value)} className="input">
            <option>In-person</option>
            <option>Virtual</option>
          </select>
        </Field>
        <Field label="Seats">
          <input type="number" value={form.seats} onChange={(e) => update("seats", e.target.value)} className="input" />
        </Field>
        <Field label="Duration">
          <input required value={form.duration} onChange={(e) => update("duration", e.target.value)} className="input" placeholder="1 day" />
        </Field>
      </div>
      <Field label="Focus">
        <input required value={form.focus} onChange={(e) => update("focus", e.target.value)} className="input" />
      </Field>
      <Field label="Blurb">
        <textarea required value={form.blurb} onChange={(e) => update("blurb", e.target.value)} className="input" rows={3} />
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