<<<<<<< HEAD
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle, Tag } from "@phosphor-icons/react/dist/ssr";
import { getContent } from "@/lib/store";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getContent().projects.find((item) => item.slug === slug && item.published);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: `${project.name} is a ${project.category.toLowerCase()} platform engineered by MintX Solutions.`,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getContent().projects.find((item) => item.slug === slug && item.published);
  if (!project) notFound();
  return (
    <article className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back to selected client work
      </Link>

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Tag size={13} className="text-[#0d9488]" />
            <span>{project.category}</span>
          </div>

          <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0b1320] leading-tight">
            {project.name}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-[#334155] max-w-[64ch]">
            {project.summary}
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#475569] max-w-[64ch]">
            Engineered and delivered by MintX Solutions with dedicated responsive layouts, fast asset delivery, and production-grade stability.
          </p>

          {project.linkNote ? (
            <p className="mt-4 text-sm text-slate-500 italic max-w-[64ch]">{project.linkNote}</p>
          ) : null}

          {project.url ? (
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a
                href={project.url}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Visit Live Production Website <ArrowUpRight size={18} />
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Inquire For Similar Build
              </Link>
            </div>
          ) : (
            <div className="mt-10">
              <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-500">
                Archived Deployment
              </span>
            </div>
          )}
        </div>

        <aside className="card-glass rounded-3xl p-8 lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-900/8">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Asset</span>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt || project.name}
                width={64}
                height={64}
                className="h-14 w-14 rounded-2xl border border-slate-900/10 bg-slate-50 object-contain p-2 shadow-sm"
              />
            ) : (
              <span className="display flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A1020] text-2xl font-bold text-[#54F2C2]">
                {project.name.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Industry / Domain</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{project.category}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Engineering Studio</p>
            <p className="mt-1 text-base font-semibold text-slate-900">MintX Solutions · Salem, TN</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</p>
            <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <CheckCircle size={16} weight="fill" className="text-emerald-500" />
              <span>Verified Deployment</span>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
=======
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle, Tag } from "@phosphor-icons/react/dist/ssr";
import { getContent } from "@/lib/store";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getContent().projects.find((item) => item.slug === slug && item.published);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: `${project.name} is a ${project.category.toLowerCase()} platform engineered by MintX Solutions.`,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getContent().projects.find((item) => item.slug === slug && item.published);
  if (!project) notFound();
  return (
    <article className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back to selected client work
      </Link>

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Tag size={13} className="text-[#0d9488]" />
            <span>{project.category}</span>
          </div>

          <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0b1320] leading-tight">
            {project.name}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-[#334155] max-w-[64ch]">
            {project.summary}
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#475569] max-w-[64ch]">
            Engineered and delivered by MintX Solutions with dedicated responsive layouts, fast asset delivery, and production-grade stability.
          </p>

          {project.linkNote ? (
            <p className="mt-4 text-sm text-slate-500 italic max-w-[64ch]">{project.linkNote}</p>
          ) : null}

          {project.url ? (
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a
                href={project.url}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Visit Live Production Website <ArrowUpRight size={18} />
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Inquire For Similar Build
              </Link>
            </div>
          ) : (
            <div className="mt-10">
              <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-500">
                Archived Deployment
              </span>
            </div>
          )}
        </div>

        <aside className="card-glass rounded-3xl p-8 lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-900/8">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Asset</span>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt || project.name}
                width={64}
                height={64}
                className="h-14 w-14 rounded-2xl border border-slate-900/10 bg-slate-50 object-contain p-2 shadow-sm"
              />
            ) : (
              <span className="display flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A1020] text-2xl font-bold text-[#54F2C2]">
                {project.name.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Industry / Domain</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{project.category}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Engineering Studio</p>
            <p className="mt-1 text-base font-semibold text-slate-900">MintX Solutions · Salem, TN</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</p>
            <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <CheckCircle size={16} weight="fill" className="text-emerald-500" />
              <span>Verified Deployment</span>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
