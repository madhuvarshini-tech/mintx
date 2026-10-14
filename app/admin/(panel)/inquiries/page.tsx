import type { Metadata } from "next";
import { updateInquiryStatus } from "@/lib/actions";
import { getInquiries } from "@/lib/store";
import type { InquiryStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Inquiries", robots: { index: false, follow: false } };

const statuses: InquiryStatus[] = ["new", "read", "replied", "archived"];

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const query = await searchParams;
  const q = (query.q || "").trim().toLowerCase();
  const status = query.status || "all";
  const page = Math.max(1, Number(query.page || 1) || 1);
  const filtered = getInquiries().filter((item) => {
    const haystack = `${item.name} ${item.email} ${item.company} ${item.details}`.toLowerCase();
    const matchesQuery = !q || haystack.includes(q);
    const matchesStatus = status === "all" || item.status === status;
    return matchesQuery && matchesStatus;
  });
  const pageSize = 8;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <h1 className="display text-5xl">Inquiries</h1>
      <form className="mt-6 flex flex-wrap gap-3" action="/admin/inquiries">
        <label className="field min-w-56">
          <span>Search</span>
          <input name="q" defaultValue={query.q || ""} />
        </label>
        <label className="field">
          <span>Status</span>
          <select name="status" defaultValue={status}>
            <option value="all">All</option>
            {statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button className="btn btn-ghost self-end">Filter</button>
      </form>
      {slice.length === 0 ? <p className="mt-8 text-[#475569]">No inquiries match this filter.</p> : null}
      <div className="mt-8 grid gap-6">
        {slice.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-900/10 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl">{item.name}</h2>
              <p className="text-sm text-[#475569]">{new Date(item.createdAt).toLocaleString("en-IN")}</p>
            </div>
            <p className="mt-2 text-sm text-[#475569]">
              {item.email}
              {item.phone ? ` · ${item.phone}` : ""}
              {item.company ? ` · ${item.company}` : ""}
            </p>
            <p className="mt-2 text-sm">
              {item.service}
              {item.budget ? ` · ${item.budget}` : ""}
            </p>
            <p className="mt-4 whitespace-pre-wrap">{item.details}</p>
            <form action={updateInquiryStatus} className="mt-4 flex flex-wrap items-end gap-3">
              <input type="hidden" name="id" value={item.id} />
              <label className="field">
                <span>Status</span>
                <select name="status" defaultValue={item.status}>
                  {statuses.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
              <button className="btn btn-primary h-11">Update status</button>
            </form>
          </article>
        ))}
      </div>
      <div className="mt-6 flex gap-3 text-sm">
        {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
          <a key={number} href={`/admin/inquiries?q=${encodeURIComponent(q)}&status=${status}&page=${number}`} className={number === page ? "text-[#0f172a]" : "text-[#475569]"}>
            {number}
          </a>
        ))}
      </div>
    </div>
  );
}
