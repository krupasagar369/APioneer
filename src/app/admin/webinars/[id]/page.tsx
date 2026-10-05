"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { WebinarForm } from "../WebinarForm";

export default function EditWebinarPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [initial, setInitial] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/webinars/${id}`)
      .then((r) => r.json())
      .then(setInitial);
  }, [id]);

  async function handleSubmit(data: Record<string, unknown>) {
    setError("");
    const res = await fetch(`/api/admin/webinars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/admin/webinars");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Failed to save.");
    }
  }

  if (!initial) return <p className="text-slate-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Edit Webinar</h1>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <div className="mt-6">
        <WebinarForm onSubmit={handleSubmit} initial={initial} />
      </div>
    </div>
  );
}