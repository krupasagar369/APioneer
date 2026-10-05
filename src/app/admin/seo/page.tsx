import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteSeoButton } from "./DeleteSeoButton";

export default async function AdminSeoPage() {
  const entries = await prisma.pageSeo.findMany({ orderBy: { path: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">SEO</h1>
          <p className="mt-1 text-sm text-slate-500">Override page titles, descriptions and social preview text.</p>
        </div>
        <Link
          href="/admin/seo/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + New Override
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Path</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{e.path}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{e.title || <span className="text-slate-400">—</span>}</td>
                <td className="px-4 py-3 text-slate-500">{e.updatedAt.toISOString().slice(0, 10)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/seo/${e.id}`} className="mr-3 text-slate-600 hover:text-slate-900">
                    Edit
                  </Link>
                  <DeleteSeoButton id={e.id} />
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  No SEO overrides yet. Pages use their built-in defaults.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}