"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Service } from "@/lib/types";

export function ServicesList({ services }: { services: Service[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Accessibility: Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-service-item]"));
    if (items.length === 0) return;

    // Progressive enhancement: activate animation styles now that JS is running
    root.classList.add("services-animate-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("service-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    // Observe all items for scroll reveals
    items.forEach((item) => {
      observer.observe(item);
    });

    // Immediate check for elements already in view on load or refresh
    requestAnimationFrame(() => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
          item.classList.add("service-revealed");
          observer.unobserve(item);
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="mt-16 grid gap-10 overflow-x-clip">
      {services.map((service, index) => {
        // Alternating reveal direction:
        // Service 1 (index 0): slide in from RIGHT
        // Service 2 (index 1): slide in from LEFT
        // Service 3 (index 2): slide in from RIGHT
        // Service 4 (index 3): slide in from LEFT
        const isSlideFromRight = index % 2 === 0;
        const animationDirectionClass = isSlideFromRight
          ? "service-from-right"
          : "service-from-left";

        return (
          <div
            key={service.slug}
            data-service-item
            className={`service-reveal-item ${animationDirectionClass}`}
          >
            <div className="double-bezel-light shadow-md hover:shadow-2xl transition-all">
              <article className="double-bezel-light-inner group grid w-full items-center gap-8 p-8 md:p-12 lg:grid-cols-12">
                <div className="service-content lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f766e]">
                    <span>0{index + 1}</span>
                    <span className="h-px w-6 bg-[#45E6BB]/40" />
                    <span>Specialized Practice</span>
                  </div>
                  <h2 className="service-heading display mt-4 text-3xl font-bold text-[#0B1220] transition-colors duration-200 group-hover:text-[#0f766e] sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="service-desc mt-4 text-base leading-relaxed text-[#64748B]">
                    {service.summary}
                  </p>
                  <div className="service-cta mt-8">
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn-pill-mint !bg-[#0B1220] !text-[#F5F6F2] !border-[#0B1220] hover:!bg-[#121B2B]"
                    >
                      <span>Explore service details</span>
                      <span className="icon-pill !bg-white/10 !text-[#45E6BB]">
                        <ArrowUpRight size={14} weight="bold" />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="service-image relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-900/10 shadow-lg lg:col-span-7">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                </div>
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
