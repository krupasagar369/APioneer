import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "../DeleteButton";

export default async function AdminWorkshopsPage() {
  const workshops = await prisma.workshop.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Workshops</h1>
        <Link
          href="/admin/workshops/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + New Workshop
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((w) => (
              <tr key={w.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{w.title}</td>
                <td className="px-4 py-3 text-slate-600">{w.date.toISOString().slice(0, 10)}</td>
                <td className="px-4 py-3 text-slate-600">{w.city}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${w.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {w.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/workshops/${w.id}`} className="mr-3 text-slate-600 hover:text-slate-900">
                    Edit
                  </Link>
                  <DeleteButton id={w.id} kind="workshops" />
                </td>
              </tr>
            ))}
            {workshops.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  No workshops yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}