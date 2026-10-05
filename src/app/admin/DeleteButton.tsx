"use client";

import { useRouter } from "next/navigation";

export function DeleteButton({ id, kind }: { id: string; kind: "workshops" | "webinars" }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await fetch(`/api/admin/${kind}/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
      Delete
    </button>
  );
}