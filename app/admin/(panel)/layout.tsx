<<<<<<< HEAD
import Link from "next/link";
import { logout } from "@/lib/actions";

const links = [
  ["Overview", "/admin"],
  ["Inquiries", "/admin/inquiries"],
  ["Applications", "/admin/applications"],
  ["Projects", "/admin/projects"],
  ["Services", "/admin/services"],
  ["Product", "/admin/product"],
  ["Notes", "/admin/posts"],
  ["Settings", "/admin/settings"],
  ["Audit", "/admin/audit"],
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-28 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="display text-3xl">Desk</p>
        <form action={logout}>
          <button className="btn btn-ghost h-10" type="submit">
            Sign out
          </button>
        </form>
      </div>
      <nav className="mt-6 flex gap-4 overflow-x-auto border-b border-slate-900/10 pb-3 text-sm" aria-label="Admin">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 text-[#475569] hover:text-[#0f172a]">
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-8">{children}</div>
    </div>
  );
}
=======
import Link from "next/link";
import { logout } from "@/lib/actions";

const links = [
  ["Overview", "/admin"],
  ["Inquiries", "/admin/inquiries"],
  ["Applications", "/admin/applications"],
  ["Projects", "/admin/projects"],
  ["Services", "/admin/services"],
  ["Product", "/admin/product"],
  ["Notes", "/admin/posts"],
  ["Settings", "/admin/settings"],
  ["Audit", "/admin/audit"],
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-28 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="display text-3xl">Desk</p>
        <form action={logout}>
          <button className="btn btn-ghost h-10" type="submit">
            Sign out
          </button>
        </form>
      </div>
      <nav className="mt-6 flex gap-4 overflow-x-auto border-b border-slate-900/10 pb-3 text-sm" aria-label="Admin">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 text-[#475569] hover:text-[#0f172a]">
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-8">{children}</div>
    </div>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
