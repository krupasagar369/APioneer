import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteBlogButton } from "./DeleteBlogButton";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blogs</h1>
          <p className="mt-1 text-sm text-slate-500">Write and publish articles.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + New Post
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{b.title}</td>
                <td className="px-4 py-3 text-slate-600">{b.category}</td>
                <td className="px-4 py-3 text-slate-600">{b.author}</td>
                <td className="px-4 py-3 text-slate-600">{b.date.toISOString().slice(0, 10)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {b.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/blogs/${b.id}`} className="mr-3 text-slate-600 hover:text-slate-900">
                    Edit
                  </Link>
                  <DeleteBlogButton id={b.id} />
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}