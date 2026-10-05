"use client";

import { useState } from "react";

type Props = {
  onSubmit: (data: Record<string, unknown>) => void;
  initial?: Record<string, unknown>;
};

export function SeoForm({ onSubmit, initial }: Props) {
  const [form, setForm] = useState({
    path: (initial?.path as string) || "",
    title: (initial?.title as string) || "",
    description: (initial?.description as string) || "",
    keywords: (initial?.keywords as string) || "",
    canonicalUrl: (initial?.canonicalUrl as string) || "",
    noindex: initial?.noindex !== undefined ? Boolean(initial.noindex) : false,
    ogTitle: (initial?.ogTitle as string) || "",
    ogDescription: (initial?.ogDescription as string) || "",
    ogImage: (initial?.ogImage as string) || "",
    twitterTitle: (initial?.twitterTitle as string) || "",
    twitterDescription: (initial?.twitterDescription as string) || "",
    twitterImage: (initial?.twitterImage as string) || "",
    jsonLd: (initial?.jsonLd as string) || "",
  });
  const [jsonLdError, setJsonLdError] = useState("");

  function update(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.jsonLd.trim()) {
      try {
        JSON.parse(form.jsonLd);
      } catch {
        setJsonLdError("This isn't valid JSON — check for a missing comma or bracket.");
        return;
      }
    }
    setJsonLdError("");
    onSubmit({
      path: form.path,
      title: form.title || null,
      description: form.description || null,
      keywords: form.keywords || null,
      canonicalUrl: form.canonicalUrl || null,
      noindex: form.noindex,
      ogTitle: form.ogTitle || null,
      ogDescription: form.ogDescription || null,
      ogImage: form.ogImage || null,
      twitterTitle: form.twitterTitle || null,
      twitterDescription: form.twitterDescription || null,
      twitterImage: form.twitterImage || null,
      jsonLd: form.jsonLd || null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-2xl gap-5 rounded-2xl border border-slate-200 bg-white p-6">
      <Field label="Page path (e.g. / , /about , /services)">
        <input required value={form.path} onChange={(e) => update("path", e.target.value)} className="input" placeholder="/about" />
      </Field>

      <div className="border-t border-slate-200 pt-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Search (SEO)</p>
        <div className="grid gap-5">
          <Field label="Title override">
            <input value={form.title} onChange={(e) => update("title", e.target.value)} className="input" />
          </Field>
          <Field label="Description override">
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="input" rows={3} />
          </Field>
          <Field label="Keywords (comma-separated, optional)">
            <input value={form.keywords} onChange={(e) => update("keywords", e.target.value)} className="input" />
          </Field>
          <Field label="Canonical URL (optional — defaults to https://apioneerbusiness.com + path)">
            <input value={form.canonicalUrl} onChange={(e) => update("canonicalUrl", e.target.value)} className="input" placeholder="https://apioneerbusiness.com/about" />
          </Field>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.noindex} onChange={(e) => update("noindex", e.target.checked)} />
            Hide from search engines (noindex)
          </label>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Social Sharing (Open Graph)</p>
        <div className="grid gap-5">
          <Field label="Open Graph title (optional — falls back to Title)">
            <input value={form.ogTitle} onChange={(e) => update("ogTitle", e.target.value)} className="input" />
          </Field>
          <Field label="Open Graph description (optional — falls back to Description)">
            <textarea value={form.ogDescription} onChange={(e) => update("ogDescription", e.target.value)} className="input" rows={2} />
          </Field>
          <Field label="Open Graph image URL (1200x630 recommended)">
            <input value={form.ogImage} onChange={(e) => update("ogImage", e.target.value)} className="input" placeholder="https://..." />
          </Field>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Twitter Card</p>
        <div className="grid gap-5">
          <Field label="Twitter title (optional — falls back to Open Graph title)">
            <input value={form.twitterTitle} onChange={(e) => update("twitterTitle", e.target.value)} className="input" />
          </Field>
          <Field label="Twitter description (optional)">
            <textarea value={form.twitterDescription} onChange={(e) => update("twitterDescription", e.target.value)} className="input" rows={2} />
          </Field>
          <Field label="Twitter image URL (optional — falls back to Open Graph image)">
            <input value={form.twitterImage} onChange={(e) => update("twitterImage", e.target.value)} className="input" />
          </Field>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Structured Data (AEO / Rich Results)</p>
        <Field label="JSON-LD (paste a full schema.org script — e.g. FAQPage, Organization, Article)">
          <textarea
            value={form.jsonLd}
            onChange={(e) => update("jsonLd", e.target.value)}
            className="input font-mono text-xs"
            rows={8}
            placeholder='{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [...]}'
          />
        </Field>
        {jsonLdError && <p className="mt-2 text-sm text-red-600">{jsonLdError}</p>}
      </div>

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