import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { getContent } from "@/lib/store";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getContent().services.find((item) => item.slug === slug && item.published);
  if (!service) return { title: "Service" };
  return { title: service.title, description: service.summary, alternates: { canonical: `/services/${service.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getContent().services.find((item) => item.slug === slug && item.published);
  if (!service) notFound();
  return (
    <article className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back to all services
      </Link>

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0f766e]">
            <Sparkle size={13} weight="fill" className="text-[#14b8a6]" />
            <span>Specialized Practice</span>
          </div>

          <h1 className="display mt-4 text-4xl sm:text-5xl md:text-6xl text-[#0b1320] leading-tight">
            {service.title}
          </h1>

          <p className="mt-5 text-xl leading-relaxed text-[#334155] font-medium">
            {service.summary}
          </p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-[#475569]">
            {service.body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-900/8 pt-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              What We Deliver
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CheckCircle size={18} weight="fill" className="text-[#0d9488]" />
                <span>Responsive & Fast Architecture</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CheckCircle size={18} weight="fill" className="text-[#0d9488]" />
                <span>Conversion-First UX Design</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CheckCircle size={18} weight="fill" className="text-[#0d9488]" />
                <span>Modern Clean Codebase</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CheckCircle size={18} weight="fill" className="text-[#0d9488]" />
                <span>Production Launch & Support</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="btn btn-primary">
              Discuss Your Project <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-slate-900/10 shadow-2xl lg:col-span-6">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </article>
  );
}
