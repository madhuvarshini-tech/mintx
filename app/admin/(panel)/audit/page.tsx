import type { Metadata } from "next";
import { getAudit } from "@/lib/store";

export const metadata: Metadata = { title: "Audit", robots: { index: false, follow: false } };

export default function AuditPage() {
  const entries = getAudit();
  return (
    <div>
      <h1 className="display text-5xl">Audit</h1>
      {entries.length === 0 ? <p className="mt-6 text-[#475569]">No recorded actions yet.</p> : null}
      <ul className="mt-8 divide-y divide-slate-900/10">
        {entries.map((entry) => (
          <li key={entry.id} className="grid gap-1 py-4 text-sm md:grid-cols-12">
            <span className="text-[#475569] md:col-span-3">{new Date(entry.at).toLocaleString("en-IN")}</span>
            <span className="md:col-span-3">{entry.actor}</span>
            <span className="md:col-span-2">{entry.action}</span>
            <span className="md:col-span-4">{entry.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
