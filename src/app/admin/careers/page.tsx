import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteCareerButton } from "./DeleteCareerButton";

export default async function AdminCareersPage() {
  const careers = await prisma.career.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Careers</h1>
          <p className="mt-1 text-sm text-slate-500">Manage open roles.</p>
        </div>
        <Link
          href="/admin/careers/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + New Role
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {careers.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{c.title}</td>
                <td className="px-4 py-3 text-slate-600">{c.team}</td>
                <td className="px-4 py-3 text-slate-600">{c.location}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {c.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/careers/${c.id}`} className="mr-3 text-slate-600 hover:text-slate-900">
                    Edit
                  </Link>
                  <DeleteCareerButton id={c.id} />
                </td>
              </tr>
            ))}
            {careers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  No roles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}