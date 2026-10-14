"use client";

import { ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { processSteps } from "@/lib/content";
import type { Product, Project, Service } from "@/lib/types";
import { ContactForm } from "@/components/contact-form";
import { MenuDemo } from "@/components/menu-demo";
import type { Settings } from "@/lib/types";

export function Services({ services }: { services: Service[] }) {
  const root = useRef<HTMLElement>(null);
  const [lead, ...rest] = services;

  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let alive = true;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from("[data-service-heading]", {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
        });
        gsap.from("[data-service-lead]", {
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-service-lead]", start: "top 88%", once: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-service-item]").forEach((item, index) => {
          gsap.from(item, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          });
        });
      }, node);
    })();
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  if (!lead) return null;
  return (
    <section id="services" ref={root} className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36 scroll-mt-24">
      <div data-service-heading className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0f766e] uppercase">
          <Sparkle size={14} weight="fill" className="text-[#45E6BB]" />
          <span>Core Capabilities & Practices</span>
        </div>
        <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl text-[#0B1220]">
          From first concept to scalable digital execution.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-[#64748B]">
          Every build begins with precision business architecture: conversion paths, blazing load speeds, and intuitive digital interfaces engineered for measurable outcomes.
        </p>
      </div>

      {/* Flagship Feature Card with Double-Bezel Architecture */}
      <div data-service-lead className="double-bezel-light mt-14 shadow-sm hover:shadow-xl">
        <Link
          href={`/services/${lead.slug}`}
          className="double-bezel-light-inner group grid items-center gap-10 p-7 md:p-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f766e]">
              <span>01</span>
              <span className="h-px w-6 bg-[#45E6BB]/40" />
              <span>Flagship Capability</span>
            </div>
            <h3 className="display mt-4 text-3xl transition-colors duration-200 group-hover:text-[#0f766e] sm:text-4xl lg:text-5xl">
              {lead.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#64748B]">{lead.summary}</p>
            <div className="mt-8 inline-flex items-center gap-2 font-semibold text-[#0f766e]">
              <span>Explore service details</span>
              <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-900/10 shadow-lg lg:col-span-7">
            <Image
              src={lead.image}
              alt={lead.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Link>
      </div>

      {/* Additional Capability Cards with Double-Bezel Light */}
      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((service, index) => (
          <li key={service.slug} data-service-item className="double-bezel-light shadow-sm hover:shadow-md">
            <Link
              href={`/services/${service.slug}`}
              className="double-bezel-light-inner group flex h-full flex-col justify-between p-8"
            >
              <div>
                <span className="text-xs font-bold text-[#0f766e] tracking-widest uppercase">0{index + 2} · Practice</span>
                <h3 className="display mt-4 text-2xl text-[#0B1220] transition-colors duration-200 group-hover:text-[#0f766e]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{service.summary}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-900/5 pt-4 text-sm font-semibold text-[#0f766e]">
                <span>View practice details</span>
                <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ProductBand({ product }: { product: Product }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let alive = true;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from("[data-product-content]", {
          x: -25,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 80%", once: true },
        });
        gsap.from("[data-product-image]", {
          x: 25,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 80%", once: true },
        });
      }, node);
    })();
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-[#0B1220] text-[#F5F6F2] border-y border-white/10 py-24 md:py-36">
      {/* Subtle Technical Grid in background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 tech-grid opacity-40" />

      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div data-product-content className="lg:col-span-7">
          <div className="badge-atelier-dark">
            <span>Proprietary Software Product</span>
          </div>
          <h2 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#F5F6F2]">{product.name}</h2>
          <p className="mt-5 max-w-[48ch] text-lg sm:text-xl text-[#45E6BB] font-medium">{product.summary}</p>
          <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-[#9AA8BA]">{product.problem} {product.solution}</p>
          
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div key={feature.title} className="card-dark rounded-2xl p-5 border border-white/10">
                <h3 className="text-base font-bold text-[#F5F6F2]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9AA8BA]">{feature.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a href={product.url} className="btn-pill-mint" target="_blank" rel="noreferrer">
              <span>Launch MintxQR Live</span>
              <span className="icon-pill">
                <ArrowUpRight size={14} weight="bold" />
              </span>
            </a>
            <Link href="/products" className="btn-pill-outline">
              <span>Explore Full System</span>
              <span className="icon-pill">
                <ArrowUpRight size={14} weight="bold" />
              </span>
            </Link>
          </div>
        </div>

        <div data-product-image className="relative mx-auto aspect-[4/3] w-full max-w-md lg:col-span-5">
          <div className="double-bezel shadow-2xl shadow-black/80">
            <div className="double-bezel-inner relative h-full w-full overflow-hidden">
              <Image src={product.image} alt={product.imageAlt} fill className="object-cover" sizes="480px" priority />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1220]/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-white/15 bg-[#0B1220]/85 p-3 backdrop-blur-md">
                <span className="text-xs font-mono text-[#45E6BB]">Live QR Table Ordering</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16">
        <MenuDemo />
      </div>
    </section>
  );
}

export function WorkShowcase({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0f766e] uppercase">
            <Sparkle size={14} weight="fill" className="text-[#45E6BB]" />
            <span>Verified Track Record</span>
          </div>
          <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl text-[#0B1220]">
            Selected Client Work
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#64748B]">
            {projects.length} verified commercial deployments engineered and launched for market leaders across India.
          </p>
        </div>
        <Link href="/work" className="btn btn-ghost font-semibold text-[#0B1220] hover:text-[#0f766e]">
          View all {projects.length} projects →
        </Link>
      </div>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.slice(0, 8).map((project) => (
          <li
            key={project.slug}
            className="double-bezel-light shadow-sm hover:shadow-xl transition-all"
          >
            <div className="double-bezel-light-inner group flex h-full flex-col justify-between p-7">
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
                      className="h-12 w-12 shrink-0 rounded-2xl border border-slate-900/5 bg-slate-50 object-contain p-1.5 shadow-sm transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="display flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5F6F2] text-xl font-bold text-[#0f766e] border border-slate-900/10"
                    >
                      {project.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="display mt-5 truncate text-xl font-bold text-[#0B1220] transition-colors duration-200 group-hover:text-[#0f766e]">
                  {project.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
                  High-performance digital presence engineered for seamless client engagement and speed.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-900/8 pt-4 text-xs font-semibold">
                <Link href={`/work/${project.slug}`} className="text-slate-500 hover:text-[#0B1220]">
                  Case study
                </Link>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#0f766e] hover:text-[#042f2e] group/link"
                  >
                    <span>Live site</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    <span className="sr-only">for {project.name}, opens in a new tab</span>
                  </a>
                ) : (
                  <span className="text-slate-400">Archived Deployment</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-12 text-center">
        <Link href="/work" className="btn-pill-mint">
          <span>Explore all {projects.length} client projects</span>
          <span className="icon-pill">
            <ArrowUpRight size={14} weight="bold" />
          </span>
        </Link>
      </div>
    </section>
  );
}

export function Process() {
  const root = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let alive = true;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          gsap.from(step, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: step, start: "top 88%", once: true },
          });
        });
      }, node);
    })();
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36 border-t border-slate-900/8">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0f766e] uppercase">
          <Sparkle size={14} weight="fill" className="text-[#45E6BB]" />
          <span>Execution Framework</span>
        </div>
        <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl text-[#0B1220]">
          How every project moves from vision to launch.
        </h2>
        <p className="mt-4 text-lg text-[#64748B]">
          A structured 5-phase delivery model ensuring complete transparency, high performance, and rapid delivery.
        </p>
      </div>
      <ol ref={root} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step) => (
          <li key={step.n} data-step className="double-bezel-light shadow-sm hover:shadow-md">
            <div className="double-bezel-light-inner flex h-full flex-col justify-between p-7">
              <div>
                <span className="display text-3xl font-bold text-[#0f766e]">{step.n}</span>
                <h3 className="display mt-4 text-xl font-bold text-[#0B1220]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{step.text}</p>
              </div>
              <div className="mt-6 h-1 w-10 rounded-full bg-[#45E6BB]/40" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AboutBand() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let alive = true;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from("[data-word]", {
          yPercent: 110,
          stagger: 0.03,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
        });
      }, node);
    })();
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  const line = "Thoughtful design. Practical technology. Meaningful outcomes.";
  return (
    <section className="mx-auto grid max-w-[1400px] gap-10 px-5 py-24 md:px-8 md:py-36 lg:grid-cols-12 border-t border-slate-900/8">
      <div className="lg:col-span-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0f766e] uppercase">
          <Sparkle size={14} weight="fill" className="text-[#45E6BB]" />
          <span>Studio Manifesto</span>
        </div>
        <h2 ref={ref} className="display mt-4 text-4xl sm:text-5xl md:text-6xl text-[#0B1220]">
          {line.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
              <span data-word className="inline-block">{word}</span>
            </span>
          ))}
        </h2>
      </div>
      <div className="max-w-[58ch] text-base leading-relaxed text-[#64748B] lg:col-span-5 lg:pt-10">
        <p>
          MintX Solutions is an independent digital atelier headquartered in Salem, Tamil Nadu. We engineer robust web systems, high-converting e-commerce engines, and native mobile applications that give businesses a sharp competitive edge.
        </p>
        <p className="mt-4">
          Serving ambitious organizations in Salem, Coimbatore, Pollachi, Dharapuram, and across India with high-availability digital architecture.
        </p>
        <div className="mt-8">
          <Link href="/about" className="btn-pill-mint !bg-[#0B1220] !text-[#F5F6F2] !border-[#0B1220] hover:!bg-[#121B2B]">
            <span>About our studio</span>
            <span className="icon-pill !bg-white/10 !text-[#45E6BB]">
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ContactBand({ settings, preset, services }: { settings: Settings; preset?: string; services: string[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let alive = true;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from("[data-contact-info]", {
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 82%", once: true },
        });
        gsap.from("[data-contact-form]", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 78%", once: true },
        });
      }, node);
    })();
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="border-t border-slate-900/10 bg-gradient-to-b from-[#F5F6F2] to-[#edf3f0] py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div data-contact-info className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0f766e] uppercase">
            <Sparkle size={14} weight="fill" className="text-[#45E6BB]" />
            <span>Direct Engagement</span>
          </div>
          <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl text-[#0B1220]">
            Let&apos;s build something that moves your business forward.
          </h2>
          <p className="mt-4 text-base text-[#64748B]">
            Tell us about your requirements, project scope, or business timeline. We respond within 24 hours.
          </p>
          <div className="mt-8 space-y-4">
            <div className="double-bezel-light shadow-sm">
              <div className="double-bezel-light-inner p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Inquiry</p>
                <a className="mt-1 block text-base font-semibold text-[#0f766e] hover:underline" href={`mailto:${settings.email}`}>{settings.email}</a>
              </div>
            </div>
            <div className="double-bezel-light shadow-sm">
              <div className="double-bezel-light-inner p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Telephone / WhatsApp</p>
                <a className="mt-1 block text-base font-semibold text-[#0B1220] hover:text-[#0f766e]" href={`tel:${settings.phoneTel}`}>{settings.phoneDisplay}</a>
              </div>
            </div>
            <div className="double-bezel-light shadow-sm">
              <div className="double-bezel-light-inner p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Studio Location</p>
                <p className="mt-1 text-sm font-medium text-slate-800">{settings.location}</p>
              </div>
            </div>
          </div>
        </div>
        <div data-contact-form className="double-bezel-light shadow-lg lg:col-span-7">
          <div className="double-bezel-light-inner p-8 md:p-10">
            <ContactForm preset={preset} services={services} />
          </div>
        </div>
      </div>
    </section>
  );
}
