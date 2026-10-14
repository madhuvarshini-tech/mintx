import type { Metadata } from "next";
import { updateApplicationStatus } from "@/lib/actions";
import { getApplications } from "@/lib/store";

export const metadata: Metadata = { title: "Applications", robots: { index: false, follow: false } };

export default function ApplicationsPage() {
  const applications = getApplications();
  return (
    <div>
      <h1 className="display text-5xl">Applications</h1>
      {applications.length === 0 ? <p className="mt-6 text-[#475569]">No applications yet. They appear here after someone applies on the careers page.</p> : null}
      <div className="mt-8 grid gap-6">
        {applications.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-900/10 p-5">
            <h2 className="text-2xl">{item.name}</h2>
            <p className="mt-2 text-sm text-[#475569]">
              {item.role} · {item.email}
              {item.phone ? ` · ${item.phone}` : ""} · {new Date(item.createdAt).toLocaleString("en-IN")}
            </p>
            <p className="mt-4 whitespace-pre-wrap">{item.note}</p>
            <a className="mt-4 inline-flex text-[#0f172a]" href={`/api/files/${item.id}`}>
              Download {item.resumeName}
            </a>
            <form action={updateApplicationStatus} className="mt-4 flex flex-wrap items-end gap-3">
              <input type="hidden" name="id" value={item.id} />
              <label className="field">
                <span>Status</span>
                <select name="status" defaultValue={item.status}>
                  <option>new</option>
                  <option>read</option>
                  <option>archived</option>
                </select>
              </label>
              <button className="btn btn-primary h-11">Update status</button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
