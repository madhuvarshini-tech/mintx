"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Subtle ambient particle sparkles matching the uploaded reference image
const particles = [
  { top: "18%", left: "14%", size: 4, opacity: 0.5, delay: "0s" },
  { top: "28%", left: "8%", size: 3, opacity: 0.4, delay: "1.2s" },
  { top: "34%", left: "22%", size: 4, opacity: 0.5, delay: "2.4s" },
  { top: "16%", left: "42%", size: 3, opacity: 0.4, delay: "0.8s" },
  { top: "22%", left: "62%", size: 4, opacity: 0.5, delay: "1.8s" },
  { top: "14%", left: "84%", size: 5, opacity: 0.6, delay: "0.4s" },
  { top: "42%", left: "91%", size: 4, opacity: 0.4, delay: "2.1s" },
  { top: "68%", left: "86%", size: 3, opacity: 0.4, delay: "1.5s" },
  { top: "72%", left: "12%", size: 4, opacity: 0.45, delay: "0.6s" },
  { top: "82%", left: "28%", size: 5, opacity: 0.5, delay: "2.8s" },
  { top: "84%", left: "76%", size: 4, opacity: 0.5, delay: "1.1s" },
  { top: "62%", left: "4%", size: 3, opacity: 0.35, delay: "1.9s" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let alive = true;

    (async () => {
      const { default: gsap } = await import("gsap");
      if (!alive) return;

      ctx = gsap.context(() => {
        gsap.from("[data-hero-tag]", {
          y: 18,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
        });

        gsap.from("[data-hero-title]", {
          y: 24,
          opacity: 0,
          duration: 0.75,
          delay: 0.12,
          ease: "power3.out",
        });

        gsap.from("[data-hero-desc]", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          delay: 0.25,
          ease: "power3.out",
        });

        gsap.from("[data-hero-btns]", {
          y: 16,
          opacity: 0,
          duration: 0.6,
          delay: 0.38,
          ease: "power3.out",
        });

        gsap.from("[data-hero-arrow]", {
          y: 12,
          opacity: 0,
          duration: 0.55,
          delay: 0.5,
          ease: "power3.out",
        });
      }, node);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[90dvh] flex-col items-center justify-center overflow-hidden bg-white px-5 pt-28 pb-16 text-center md:px-8 md:pt-36 md:pb-20"
    >
      {/* Soft Ambient Mint Gradient Orbs matching the uploaded screenshot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 z-0 h-[500px] w-[500px] rounded-full blur-[90px] md:h-[680px] md:w-[680px]"
        style={{
          background: "radial-gradient(circle, rgba(45, 212, 191, 0.32) 0%, rgba(20, 184, 166, 0.14) 45%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 z-0 h-[520px] w-[520px] rounded-full blur-[95px] md:h-[700px] md:w-[700px]"
        style={{
          background: "radial-gradient(circle, rgba(45, 212, 191, 0.30) 0%, rgba(20, 184, 166, 0.12) 45%, transparent 72%)",
        }}
      />

      {/* Ambient floating specks / sparkles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {particles.map((p, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-[#14b8a6] animate-pulse"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: "3.2s",
            }}
          />
        ))}
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Brand Label */}
        <div data-hero-tag className="mb-3 sm:mb-4">
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#14b8a6]">
            MintX Solutions
          </span>
        </div>

        {/* Headline */}
        <h1
          data-hero-title
          className="display text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-extrabold tracking-tight text-[#0F172A] leading-[1.14]"
        >
          Building Digital Experiences
          <br className="hidden sm:inline" /> That Grow Businesses
        </h1>

        {/* Supporting Subtitle */}
        <p
          data-hero-desc
          className="mt-6 text-base sm:text-lg md:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Transform your business with cutting-edge web development, mobile apps, and digital
          marketing solutions. We turn ideas into digital success stories.
        </p>

        {/* CTA Buttons - Matching reference screenshot */}
        <div
          data-hero-btns
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-xl px-7 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:opacity-95 hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#14b8a6]"
            style={{ backgroundColor: "#14b8a6", color: "#ffffff" }}
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border-2 px-7 py-3 text-base font-semibold transition-all duration-200 hover:bg-[#14b8a6]/10 focus-visible:outline-2 focus-visible:outline-[#14b8a6]"
            style={{ borderColor: "#14b8a6", color: "#14b8a6", backgroundColor: "#ffffff" }}
          >
            Contact Us
          </Link>
        </div>

        {/* Centered Down Chevron */}
        <div data-hero-arrow className="mt-8 sm:mt-10 flex justify-center">
          <a
            href="#services"
            aria-label="Scroll down to services"
            className="inline-flex text-[#14b8a6] transition-colors duration-200 hover:text-[#0d9488] animate-bounce"
            style={{ color: "#14b8a6" }}
          >
            <svg
              className="h-6 w-6 stroke-[2.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
