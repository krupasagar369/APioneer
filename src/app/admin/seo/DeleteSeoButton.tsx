"use client";

import { useRouter } from "next/navigation";

export function DeleteSeoButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this SEO override? The page will fall back to its default metadata.")) return;
    await fetch(`/api/admin/seo/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
      Delete
    </button>
  );
}