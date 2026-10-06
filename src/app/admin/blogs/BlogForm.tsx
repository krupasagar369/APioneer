"use client";

import { useState } from "react";

type Section = { heading: string; paragraphs: string[]; imageUrl?: string; imageAlt?: string };
type Faq = { question: string; answer: string };

type Props = {
  onSubmit: (data: Record<string, unknown>) => void;
  initial?: Record<string, unknown>;
};

function parseJsonArray<T>(value: unknown): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as T[];
  try {
    const parsed = JSON.parse(value as string);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function BlogForm({ onSubmit, initial }: Props) {
  const [form, setForm] = useState({
    title: (initial?.title as string) || "",
    slug: (initial?.slug as string) || "",
    excerpt: (initial?.excerpt as string) || "",
    category: (initial?.category as string) || "",
    author: (initial?.author as string) || "",
    authorRole: (initial?.authorRole as string) || "",
    authorBio: (initial?.authorBio as string) || "",
    date: initial?.date ? String(initial.date).slice(0, 10) : "",
    readTime: (initial?.readTime as string) || "",
    ogImage: (initial?.ogImage as string) || "",
    published: initial?.published !== undefined ? Boolean(initial.published) : true,
  });

  const [keyTakeaways, setKeyTakeaways] = useState<string[]>(parseJsonArray<string>(initial?.keyTakeaways));
  const [sections, setSections] = useState<Section[]>(parseJsonArray<Section>(initial?.body));
  const [faqs, setFaqs] = useState<Faq[]>(parseJsonArray<Faq>(initial?.faqs));

  function update(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // --- Key takeaways ---
  function addTakeaway() {
    setKeyTakeaways((t) => [...t, ""]);
  }
  function updateTakeaway(i: number, value: string) {
    setKeyTakeaways((t) => t.map((x, idx) => (idx === i ? value : x)));
  }
  function removeTakeaway(i: number) {
    setKeyTakeaways((t) => t.filter((_, idx) => idx !== i));
  }

  // --- Body sections ---
  function addSection() {
    setSections((s) => [...s, { heading: "", paragraphs: [""], imageUrl: "", imageAlt: "" }]);
  }
  function updateSectionHeading(i: number, value: string) {
    setSections((s) => s.map((sec, idx) => (idx === i ? { ...sec, heading: value } : sec)));
  }
  function updateSectionImage(i: number, key: "imageUrl" | "imageAlt", value: string) {
    setSections((s) => s.map((sec, idx) => (idx === i ? { ...sec, [key]: value } : sec)));
  }
  function addParagraph(sectionIdx: number) {
    setSections((s) =>
      s.map((sec, idx) => (idx === sectionIdx ? { ...sec, paragraphs: [...sec.paragraphs, ""] } : sec))
    );
  }
  function updateParagraph(sectionIdx: number, pIdx: number, value: string) {
    setSections((s) =>
      s.map((sec, idx) =>
        idx === sectionIdx
          ? { ...sec, paragraphs: sec.paragraphs.map((p, pi) => (pi === pIdx ? value : p)) }
          : sec
      )
    );
  }
  function removeParagraph(sectionIdx: number, pIdx: number) {
    setSections((s) =>
      s.map((sec, idx) =>
        idx === sectionIdx ? { ...sec, paragraphs: sec.paragraphs.filter((_, pi) => pi !== pIdx) } : sec
      )
    );
  }
  function removeSection(i: number) {
    setSections((s) => s.filter((_, idx) => idx !== i));
  }

  // --- FAQs ---
  function addFaq() {
    setFaqs((f) => [...f, { question: "", answer: "" }]);
  }
  function updateFaq(i: number, key: "question" | "answer", value: string) {
    setFaqs((f) => f.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)));
  }
  function removeFaq(i: number) {
    setFaqs((f) => f.filter((_, idx) => idx !== i));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      date: new Date(form.date).toISOString(),
      ogImage: form.ogImage || null,
      authorRole: form.authorRole || null,
      authorBio: form.authorBio || null,
      keyTakeaways: keyTakeaways.filter((t) => t.trim()).length
        ? JSON.stringify(keyTakeaways.filter((t) => t.trim()))
        : null,
      body: sections.length
        ? JSON.stringify(
            sections.map((s) => ({
              ...s,
              paragraphs: s.paragraphs.filter((p) => p.trim()),
            }))
          )
        : null,
      faqs: faqs.filter((f) => f.question.trim()).length
        ? JSON.stringify(faqs.filter((f) => f.question.trim()))
        : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-3xl gap-6">
      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Post details</p>
        <Field label="Title">
          <input required value={form.title} onChange={(e) => update("title", e.target.value)} className="input" />
        </Field>
        <Field label="Slug (URL-friendly, unique)">
          <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className="input" />
        </Field>
        <Field label="Excerpt / summary">
          <textarea required value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} className="input" rows={3} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <input required value={form.category} onChange={(e) => update("category", e.target.value)} className="input" />
          </Field>
          <Field label="Date">
            <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="input" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Author name">
            <input required value={form.author} onChange={(e) => update("author", e.target.value)} className="input" />
          </Field>
          <Field label="Read time (e.g. 7 min)">
            <input required value={form.readTime} onChange={(e) => update("readTime", e.target.value)} className="input" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Author role (optional)">
            <input value={form.authorRole} onChange={(e) => update("authorRole", e.target.value)} className="input" />
          </Field>
          <Field label="Cover / OG image URL (optional)">
            <input value={form.ogImage} onChange={(e) => update("ogImage", e.target.value)} className="input" />
          </Field>
        </div>
        <Field label="Author bio (optional)">
          <textarea value={form.authorBio} onChange={(e) => update("authorBio", e.target.value)} className="input" rows={2} />
        </Field>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
          Published
        </label>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Key takeaways (optional)</p>
          <button type="button" onClick={addTakeaway} className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            + Add
          </button>
        </div>
        {keyTakeaways.map((t, i) => (
          <div key={i} className="flex gap-2">
            <input value={t} onChange={(e) => updateTakeaway(i, e.target.value)} className="input flex-1" placeholder="A scannable takeaway" />
            <button type="button" onClick={() => removeTakeaway(i)} className="text-red-500 hover:text-red-700">
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Article body (sections)</p>
          <button type="button" onClick={addSection} className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            + Add section
          </button>
        </div>
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-2">
              <input
                value={section.heading}
                onChange={(e) => updateSectionHeading(sIdx, e.target.value)}
                className="input flex-1 font-semibold"
                placeholder="Section heading"
              />
              <button type="button" onClick={() => removeSection(sIdx)} className="ml-2 shrink-0 text-red-500 hover:text-red-700">
                Remove section
              </button>
            </div>
            <div className="mt-3 grid gap-2">
              {section.paragraphs.map((p, pIdx) => (
                <div key={pIdx} className="flex gap-2">
                  <textarea
                    value={p}
                    onChange={(e) => updateParagraph(sIdx, pIdx, e.target.value)}
                    className="input flex-1"
                    rows={3}
                    placeholder="Paragraph text"
                  />
                  <button type="button" onClick={() => removeParagraph(sIdx, pIdx)} className="text-red-500 hover:text-red-700">
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addParagraph(sIdx)}
                className="w-fit text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                + Add paragraph
              </button>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="mb-2 text-xs font-semibold text-slate-500">Image after this section (optional)</p>
              <div className="grid gap-2">
                <input
                  value={section.imageUrl || ""}
                  onChange={(e) => updateSectionImage(sIdx, "imageUrl", e.target.value)}
                  className="input"
                  placeholder="Image URL"
                />
                <input
                  value={section.imageAlt || ""}
                  onChange={(e) => updateSectionImage(sIdx, "imageAlt", e.target.value)}
                  className="input"
                  placeholder="Descriptive alt text (e.g. 'Trainer leading a hands-on Kubernetes lab session') — this is what Google Images indexes, so write it like a real sentence, not a filename"
                />
                {section.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={section.imageUrl} alt={section.imageAlt || ""} className="mt-1 h-32 w-full rounded-lg object-cover" />
                ) : null}
              </div>
            </div>
          </div>
        ))}
        {sections.length === 0 && (
          <p className="text-sm text-slate-400">No sections yet — a default placeholder body will show until you add one.</p>
        )}
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">FAQs (optional)</p>
          <button type="button" onClick={addFaq} className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            + Add FAQ
          </button>
        </div>
        {faqs.map((f, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <input
                value={f.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)}
                className="input flex-1"
                placeholder="Question"
              />
              <button type="button" onClick={() => removeFaq(i)} className="text-red-500 hover:text-red-700">
                ✕
              </button>
            </div>
            <textarea
              value={f.answer}
              onChange={(e) => updateFaq(i, "answer", e.target.value)}
              className="input mt-2"
              rows={2}
              placeholder="Answer"
            />
          </div>
        ))}
      </div>

      <button type="submit" className="w-fit rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
        Save Post
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