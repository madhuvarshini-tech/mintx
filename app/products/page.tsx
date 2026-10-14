import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, QrCode } from "@phosphor-icons/react/dist/ssr";
import { MenuDemo } from "@/components/menu-demo";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "MintxQR Product Suite",
  description: "MintxQR is an advanced contactless digital menu and QR table-ordering system for restaurants, cafes, and hospitality venues.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const { product } = getContent();
  return (
    <article className="pb-28">
      {/* Product Hero Section */}
      <section className="relative overflow-hidden bg-[#0B1220] text-[#F5F6F2] pt-32 pb-24 md:pt-40 md:pb-28 border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 tech-grid opacity-40" />
        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="badge-atelier-dark">
              <span>Proprietary Hospitality Platform</span>
            </div>
            <h1 className="display mt-4 text-5xl sm:text-7xl md:text-8xl text-[#F5F6F2]">
              {product.name}
            </h1>
            <p className="mt-6 max-w-[48ch] text-xl leading-relaxed text-[#45E6BB] font-medium">
              {product.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a className="btn-pill-mint" href={product.url} target="_blank" rel="noreferrer">
                <span>Launch MintxQR Live</span>
                <span className="icon-pill">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </a>
              <Link href="/contact" className="btn-pill-outline">
                <span>Inquire For Your Venue</span>
                <span className="icon-pill">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full max-w-md mx-auto lg:col-span-5">
            <div className="double-bezel shadow-2xl shadow-black/80">
              <div className="double-bezel-inner relative h-full w-full overflow-hidden">
                <Image src={product.image} alt={product.imageAlt} fill className="object-cover" sizes="480px" priority />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1220]/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-white/15 bg-[#0B1220]/80 p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <QrCode size={18} className="text-[#45E6BB]" />
                    <span className="text-xs font-mono text-[#F5F6F2]">Scan to Order</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Contrast Grid */}
      <section className="border-b border-slate-900/8 bg-[#F5F6F2] py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 md:px-8 lg:grid-cols-2">
          <div className="double-bezel-light shadow-sm">
            <div className="double-bezel-light-inner p-8 border-rose-500/15">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600">The Problem</span>
              <h2 className="display mt-3 text-3xl font-bold text-[#0B1220]">Outdated physical menus & slow table service</h2>
              <p className="mt-4 text-base leading-relaxed text-[#64748B]">{product.problem}</p>
            </div>
          </div>
          <div className="double-bezel-light shadow-sm">
            <div className="double-bezel-light-inner p-8 border-[#45E6BB]/25">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0f766e]">The Solution</span>
              <h2 className="display mt-3 text-3xl font-bold text-[#0B1220]">Instant QR table ordering on customer phones</h2>
              <p className="mt-4 text-base leading-relaxed text-[#64748B]">{product.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Flow */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0f766e] uppercase">
          <span>Operational Architecture</span>
        </div>
        <h2 className="display mt-4 text-4xl sm:text-5xl font-bold text-[#0B1220]">How MintxQR works</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.steps.map((step, index) => (
            <li key={step} className="double-bezel-light shadow-sm">
              <div className="double-bezel-light-inner flex h-full flex-col justify-between p-7">
                <div>
                  <span className="display text-3xl font-bold text-[#0f766e]">0{index + 1}</span>
                  <p className="mt-4 text-base font-semibold text-[#0B1220] leading-snug">{step}</p>
                </div>
                <div className="mt-6 h-1 w-8 rounded-full bg-[#45E6BB]/40" />
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* System Capabilities */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0f766e] uppercase">
          <span>Engine Highlights</span>
        </div>
        <h2 className="display mt-4 text-4xl sm:text-5xl font-bold text-[#0B1220]">System Capabilities</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((feature) => (
            <div key={feature.title} className="double-bezel-light shadow-sm">
              <div className="double-bezel-light-inner p-7">
                <h3 className="text-lg font-bold text-[#0B1220]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Menu Demo */}
      <section className="bg-slate-50 py-16 border-t border-slate-900/8">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <MenuDemo />
        </div>
      </section>
    </article>
  );
}
