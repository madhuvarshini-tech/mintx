import type { Metadata } from "next";
import Link from "next/link";
import { getApplications, getAudit, getInquiries } from "@/lib/store";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminHome() {
  const inquiries = getInquiries();
  const applications = getApplications();
  const audit = getAudit().slice(0, 5);
  const counts = [
    ["New inquiries", inquiries.filter((item) => item.status === "new").length, "/admin/inquiries"],
    ["All inquiries", inquiries.length, "/admin/inquiries"],
    ["Applications", applications.length, "/admin/applications"],
  ] as const;
  return (
    <div>
      <h1 className="display text-5xl">Overview</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {counts.map(([label, count, href]) => (
          <Link key={label} href={href} className="rounded-2xl border border-slate-900/10 bg-[#eef8f6] p-5">
            <p className="text-sm text-[#475569]">{label}</p>
            <p className="display mt-3 text-5xl">{count}</p>
          </Link>
        ))}
      </div>
      <h2 className="mt-12 text-2xl">Recent admin actions</h2>
      {audit.length === 0 ? <p className="mt-4 text-[#475569]">No admin actions yet.</p> : null}
      <ul className="mt-4 divide-y divide-slate-900/10">
        {audit.map((entry) => (
          <li key={entry.id} className="py-3 text-sm">
            <span className="text-[#475569]">{new Date(entry.at).toLocaleString("en-IN")}</span> {entry.actor} {entry.action}: {entry.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
