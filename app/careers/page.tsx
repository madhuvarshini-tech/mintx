<<<<<<< HEAD
import type { Metadata } from "next";
import { Sparkle, Briefcase, MapPin, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { CareerForm } from "@/components/career-form";
import { published } from "@/lib/content";
import { formatDate } from "@/lib/site";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Careers & Internships",
  description: "Internships at MintX Solutions in Salem, including engineering, UI/UX design, video editing, and digital marketing roles.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  const roles = published(getContent().roles);
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0f766e]">
          <Sparkle size={14} weight="fill" className="text-[#14b8a6]" />
          <span>Talent & Studio Growth</span>
        </div>
        <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0b1320]">
          Engineering & Creative Roles in Salem.
        </h1>
        <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#475569]">
          Join an agile team working directly on real commercial deployments, high-performance web systems, and innovative products.
        </p>
      </div>

      <div className="mt-14 grid gap-6">
        {roles.map((role) => (
          <article
            key={role.slug}
            className="card-glass group rounded-3xl p-8 transition-all duration-300 hover:border-[#0d9488]/30 hover:shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d9488]/10 text-[#0d9488]">
                  <Briefcase size={20} weight="bold" />
                </span>
                <h2 className="display text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-[#0d9488] transition-colors">
                  {role.title}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#475569]">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{role.type}</span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#0d9488]" /> {role.location}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarBlank size={14} /> Posted {formatDate(role.posted)}
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-[76ch] text-base leading-relaxed text-[#334155]">{role.summary}</p>

            <div className="mt-6 border-t border-slate-900/5 pt-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Key Skills & Tools</p>
              <ul className="flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-slate-900/10 bg-white px-3.5 py-1 text-xs font-medium text-slate-700 shadow-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 max-w-3xl card-glass rounded-3xl p-8 md:p-12 border-[#0d9488]/20 bg-gradient-to-br from-white to-[#f0fdf9]">
        <span className="badge-mint">Application Portal</span>
        <h2 className="display mt-3 text-3xl sm:text-4xl font-bold text-slate-900">Apply for an opening</h2>
        <p className="mt-3 text-base text-[#475569]">
          Select your desired role or submit a general application. Our studio team reviews submissions weekly.
        </p>
        <div className="mt-8">
          <CareerForm roles={roles.map((role) => role.title)} />
        </div>
      </div>
    </section>
  );
}
=======
import type { Metadata } from "next";
import { Sparkle, Briefcase, MapPin, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { CareerForm } from "@/components/career-form";
import { published } from "@/lib/content";
import { formatDate } from "@/lib/site";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Careers & Internships",
  description: "Internships at MintX Solutions in Salem, including engineering, UI/UX design, video editing, and digital marketing roles.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  const roles = published(getContent().roles);
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0f766e]">
          <Sparkle size={14} weight="fill" className="text-[#14b8a6]" />
          <span>Talent & Studio Growth</span>
        </div>
        <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0b1320]">
          Engineering & Creative Roles in Salem.
        </h1>
        <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#475569]">
          Join an agile team working directly on real commercial deployments, high-performance web systems, and innovative products.
        </p>
      </div>

      <div className="mt-14 grid gap-6">
        {roles.map((role) => (
          <article
            key={role.slug}
            className="card-glass group rounded-3xl p-8 transition-all duration-300 hover:border-[#0d9488]/30 hover:shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d9488]/10 text-[#0d9488]">
                  <Briefcase size={20} weight="bold" />
                </span>
                <h2 className="display text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-[#0d9488] transition-colors">
                  {role.title}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#475569]">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{role.type}</span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#0d9488]" /> {role.location}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarBlank size={14} /> Posted {formatDate(role.posted)}
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-[76ch] text-base leading-relaxed text-[#334155]">{role.summary}</p>

            <div className="mt-6 border-t border-slate-900/5 pt-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Key Skills & Tools</p>
              <ul className="flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-slate-900/10 bg-white px-3.5 py-1 text-xs font-medium text-slate-700 shadow-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 max-w-3xl card-glass rounded-3xl p-8 md:p-12 border-[#0d9488]/20 bg-gradient-to-br from-white to-[#f0fdf9]">
        <span className="badge-mint">Application Portal</span>
        <h2 className="display mt-3 text-3xl sm:text-4xl font-bold text-slate-900">Apply for an opening</h2>
        <p className="mt-3 text-base text-[#475569]">
          Select your desired role or submit a general application. Our studio team reviews submissions weekly.
        </p>
        <div className="mt-8">
          <CareerForm roles={roles.map((role) => role.title)} />
        </div>
      </div>
    </section>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
