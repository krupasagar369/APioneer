"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SeoForm } from "../SeoForm";

export default function NewSeoPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(data: Record<string, unknown>) {
    setError("");
    const res = await fetch("/api/admin/seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/admin/seo");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Failed to save.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">New SEO Override</h1>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <div className="mt-6">
        <SeoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}