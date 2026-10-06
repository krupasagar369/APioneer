"use client";

import { useState } from "react";

type Props = {
  onSubmit: (data: Record<string, unknown>) => void;
  initial?: Record<string, unknown>;
};

function parseJsonArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as string[];
  try {
    const parsed = JSON.parse(value as string);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function ListEditor({
  label,
  items,
  setItems,
  placeholder,
}: {
  label: string;
  items: string[];
  setItems: (items: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
        <button
          type="button"
          onClick={() => setItems([...items, ""])}
          className="text-sm font-semibold text-slate-700 hover:text-slate-900"
        >
          + Add
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => setItems(items.map((it, idx) => (idx === i ? e.target.value : it)))}
            className="input flex-1"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => setItems(items.filter((_, idx) => idx !== i))}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export function CareerForm({ onSubmit, initial }: Props) {
  const [form, setForm] = useState({
    title: (initial?.title as string) || "",
    slug: (initial?.slug as string) || "",
    team: (initial?.team as string) || "",
    location: (initial?.location as string) || "",
    type: (initial?.type as string) || "Full-time",
    exp: (initial?.exp as string) || "",
    blurb: (initial?.blurb as string) || "",
    employmentType: (initial?.employmentType as string) || "",
    about: (initial?.about as string) || "",
    published: initial?.published !== undefined ? Boolean(initial.published) : true,
  });

  const [responsibilities, setResponsibilities] = useState<string[]>(parseJsonArray(initial?.responsibilities));
  const [requirements, setRequirements] = useState<string[]>(parseJsonArray(initial?.requirements));
  const [niceToHave, setNiceToHave] = useState<string[]>(parseJsonArray(initial?.niceToHave));
  const [benefits, setBenefits] = useState<string[]>(parseJsonArray(initial?.benefits));

  function update(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toJsonOrNull(arr: string[]) {
    const clean = arr.filter((x) => x.trim());
    return clean.length ? JSON.stringify(clean) : null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      employmentType: form.employmentType || null,
      about: form.about || null,
      responsibilities: toJsonOrNull(responsibilities),
      requirements: toJsonOrNull(requirements),
      niceToHave: toJsonOrNull(niceToHave),
      benefits: toJsonOrNull(benefits),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-3xl gap-6">
      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Role details</p>
        <Field label="Title">
          <input required value={form.title} onChange={(e) => update("title", e.target.value)} className="input" />
        </Field>
        <Field label="Slug (URL-friendly, unique)">
          <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className="input" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Team">
            <input required value={form.team} onChange={(e) => update("team", e.target.value)} className="input" />
          </Field>
          <Field label="Location">
            <input required value={form.location} onChange={(e) => update("location", e.target.value)} className="input" placeholder="Bengaluru · Hybrid" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Type">
            <select value={form.type} onChange={(e) => update("type", e.target.value)} className="input">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </Field>
          <Field label="Experience (e.g. 5+ years)">
            <input required value={form.exp} onChange={(e) => update("exp", e.target.value)} className="input" />
          </Field>
        </div>
        <Field label="Short blurb (shown on the careers list)">
          <textarea required value={form.blurb} onChange={(e) => update("blurb", e.target.value)} className="input" rows={2} />
        </Field>
        <Field label="About the role (optional, longer description)">
          <textarea value={form.about} onChange={(e) => update("about", e.target.value)} className="input" rows={4} />
        </Field>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
          Published
        </label>
      </div>

      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <ListEditor label="Responsibilities" items={responsibilities} setItems={setResponsibilities} placeholder="A responsibility" />
      </div>
      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <ListEditor label="Requirements" items={requirements} setItems={setRequirements} placeholder="A requirement" />
      </div>
      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <ListEditor label="Nice to have" items={niceToHave} setItems={setNiceToHave} placeholder="A nice-to-have" />
      </div>
      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <ListEditor label="Benefits" items={benefits} setItems={setBenefits} placeholder="A benefit" />
      </div>

      <button type="submit" className="w-fit rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
        Save Role
      </button>
      <style jsx>{`
        .input {
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          width: 100%;
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
