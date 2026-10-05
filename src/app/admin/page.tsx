import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [workshopCount, webinarCount] = await Promise.all([
    prisma.workshop.count(),
    prisma.webinar.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Overview of your site content.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-medium text-slate-500">Workshops</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{workshopCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-medium text-slate-500">Webinars</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{webinarCount}</p>
        </div>
      </div>
    </div>
  );
}