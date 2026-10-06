"use client";

import { useRouter } from "next/navigation";

export function DeleteCareerButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this role? This cannot be undone.")) return;
    await fetch(`/api/admin/careers/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
      Delete
    </button>
  );
}
