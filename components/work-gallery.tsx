"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Project } from "@/lib/types";

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div>
      {/* Category Pills Filter */}
      <div className="mt-10 flex flex-wrap gap-2 items-center">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[#0B1220] text-[#45E6BB] border border-[#45E6BB]/40 shadow-sm"
                  : "bg-white text-slate-600 border border-slate-900/10 hover:border-slate-900/25 hover:text-slate-900"
              }`}
            >
              {cat}
              {cat === "All" ? ` (${projects.length})` : ""}
            </button>
          );
        })}
      </div>

      {/* Projects Grid with Double-Bezel Light Architecture */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <div
            key={project.slug}
            className="double-bezel-light shadow-sm hover:shadow-xl transition-all"
          >
            <article className="double-bezel-light-inner group flex h-full flex-col justify-between p-7">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-700 border border-slate-900/5">
                    {project.category}
                  </span>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.imageAlt || ""}
                      width={56}
                      height={56}
                      className="h-12 w-12 rounded-2xl border border-slate-900/8 bg-slate-50 object-contain p-1.5 shadow-sm transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="display flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1220] text-xl font-bold text-[#45E6BB] border border-white/10"
                    >
                      {project.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h2 className="display mt-6 text-2xl font-bold text-[#0B1220] transition-colors duration-200 group-hover:text-[#0f766e]">
                  {project.name}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#64748B]">{project.summary}</p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-slate-900/8 pt-4 text-sm font-semibold">
                <Link
                  href={`/work/${project.slug}`}
                  className="text-slate-500 hover:text-[#0B1220] transition-colors"
                >
                  Case study
                </Link>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#0f766e] hover:text-[#042f2e] group/link transition-colors"
                  >
                    <span>Live site</span>
                    <ArrowUpRight size={15} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    <span className="sr-only">for {project.name}, opens in a new tab</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">Archived Deployment</span>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
