<<<<<<< HEAD
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkle, ShieldCheck, Lightning, UsersThree, Target } from "@phosphor-icons/react/dist/ssr";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "About Our Studio",
  description: "MintX Solutions is an independent digital atelier in Salem, Tamil Nadu, engineering custom web platforms, e-commerce, and mobile applications across India.",
  alternates: { canonical: "/about" },
};

const places = ["Salem, TN (Headquarters)", "Coimbatore", "Pollachi", "Dharapuram", "Pan-India Remote"];

const pillars = [
  {
    icon: Lightning,
    title: "Sub-Second Performance",
    text: "Every website and system is engineered to pass Core Web Vitals with near-instant interactive rendering and optimized asset delivery.",
  },
  {
    icon: Target,
    title: "Conversion-Led Architecture",
    text: "Layouts, typography, and user flows are deliberately sculpted to guide real customers toward inquiries, bookings, or purchases.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Bloat Codebases",
    text: "Modern full-stack architecture with Next.js and accessible semantic HTML. No slow page-builder cruft or fragile templates.",
  },
  {
    icon: UsersThree,
    title: "Direct Founder Collaboration",
    text: "You partner directly with senior engineers and product designers who understand commercial realities and technical nuances.",
  },
];

export default function AboutPage() {
  const { settings } = getContent();
  return (
    <article className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0f766e]">
          <Sparkle size={14} weight="fill" className="text-[#45E6BB]" />
          <span>Independent Digital Atelier</span>
        </div>
        <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0B1220]">
          Thoughtful design. Practical technology. Meaningful outcomes.
        </h1>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="max-w-[62ch] space-y-6 text-lg leading-relaxed text-[#64748B] lg:col-span-7">
          <p>
            <strong className="font-semibold text-[#0B1220]">MintX Solutions</strong> is an independent technology and design studio based in Salem, Tamil Nadu. We engineer robust web architectures, high-performance e-commerce platforms, native applications, and strategic search optimization that convert visitors into lasting commercial relationships.
          </p>
          <p>
            We collaborate directly with business founders and enterprise teams across Salem, Coimbatore, Pollachi, Dharapuram, and pan-India. Our core mandate is singular: transform complex business requirements into clear, lightning-fast digital products that people genuinely love using.
          </p>
          <p>
            Every line of code is structured for scale, zero bloat, accessibility, and measurable commercial growth.
          </p>
        </div>

        <aside className="double-bezel-light shadow-sm lg:col-span-5 flex flex-col justify-between">
          <div className="double-bezel-light-inner p-8 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0f766e]">Operational Footprint</span>
              <ul className="mt-6 divide-y divide-slate-900/8">
                {places.map((place) => (
                  <li key={place} className="flex items-center justify-between py-3.5 text-base font-semibold text-[#0B1220]">
                    <span>{place}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#45E6BB]" />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-[#64748B]">Studio Base: <span className="font-semibold text-[#0B1220]">{settings.location}</span></p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-900/8">
              <Link href="/contact" className="btn-pill-mint w-full justify-center text-center">
                <span>Discuss Your Project</span>
                <span className="icon-pill">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Engineering Pillars */}
      <section className="mt-24 border-t border-slate-900/10 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0f766e] uppercase">
            <span>Studio Principles</span>
          </div>
          <h2 className="display mt-4 text-3xl sm:text-5xl font-bold text-[#0B1220]">
            How we engineer digital quality
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="double-bezel-light shadow-sm">
                <div className="double-bezel-light-inner p-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#45E6BB]/15 text-[#0f766e]">
                      <Icon size={24} weight="bold" />
                    </div>
                    <h3 className="display mt-5 text-xl font-bold text-[#0B1220]">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{pillar.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
=======
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkle, ShieldCheck, Lightning, UsersThree, Target } from "@phosphor-icons/react/dist/ssr";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "About Our Studio",
  description: "MintX Solutions is an independent digital atelier in Salem, Tamil Nadu, engineering custom web platforms, e-commerce, and mobile applications across India.",
  alternates: { canonical: "/about" },
};

const places = ["Salem, TN (Headquarters)", "Coimbatore", "Pollachi", "Dharapuram", "Pan-India Remote"];

const pillars = [
  {
    icon: Lightning,
    title: "Sub-Second Performance",
    text: "Every website and system is engineered to pass Core Web Vitals with near-instant interactive rendering and optimized asset delivery.",
  },
  {
    icon: Target,
    title: "Conversion-Led Architecture",
    text: "Layouts, typography, and user flows are deliberately sculpted to guide real customers toward inquiries, bookings, or purchases.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Bloat Codebases",
    text: "Modern full-stack architecture with Next.js and accessible semantic HTML. No slow page-builder cruft or fragile templates.",
  },
  {
    icon: UsersThree,
    title: "Direct Founder Collaboration",
    text: "You partner directly with senior engineers and product designers who understand commercial realities and technical nuances.",
  },
];

export default function AboutPage() {
  const { settings } = getContent();
  return (
    <article className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0f766e]">
          <Sparkle size={14} weight="fill" className="text-[#45E6BB]" />
          <span>Independent Digital Atelier</span>
        </div>
        <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0B1220]">
          Thoughtful design. Practical technology. Meaningful outcomes.
        </h1>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="max-w-[62ch] space-y-6 text-lg leading-relaxed text-[#64748B] lg:col-span-7">
          <p>
            <strong className="font-semibold text-[#0B1220]">MintX Solutions</strong> is an independent technology and design studio based in Salem, Tamil Nadu. We engineer robust web architectures, high-performance e-commerce platforms, native applications, and strategic search optimization that convert visitors into lasting commercial relationships.
          </p>
          <p>
            We collaborate directly with business founders and enterprise teams across Salem, Coimbatore, Pollachi, Dharapuram, and pan-India. Our core mandate is singular: transform complex business requirements into clear, lightning-fast digital products that people genuinely love using.
          </p>
          <p>
            Every line of code is structured for scale, zero bloat, accessibility, and measurable commercial growth.
          </p>
        </div>

        <aside className="double-bezel-light shadow-sm lg:col-span-5 flex flex-col justify-between">
          <div className="double-bezel-light-inner p-8 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0f766e]">Operational Footprint</span>
              <ul className="mt-6 divide-y divide-slate-900/8">
                {places.map((place) => (
                  <li key={place} className="flex items-center justify-between py-3.5 text-base font-semibold text-[#0B1220]">
                    <span>{place}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#45E6BB]" />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-[#64748B]">Studio Base: <span className="font-semibold text-[#0B1220]">{settings.location}</span></p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-900/8">
              <Link href="/contact" className="btn-pill-mint w-full justify-center text-center">
                <span>Discuss Your Project</span>
                <span className="icon-pill">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Engineering Pillars */}
      <section className="mt-24 border-t border-slate-900/10 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#45E6BB]/30 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0f766e] uppercase">
            <span>Studio Principles</span>
          </div>
          <h2 className="display mt-4 text-3xl sm:text-5xl font-bold text-[#0B1220]">
            How we engineer digital quality
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="double-bezel-light shadow-sm">
                <div className="double-bezel-light-inner p-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#45E6BB]/15 text-[#0f766e]">
                      <Icon size={24} weight="bold" />
                    </div>
                    <h3 className="display mt-5 text-xl font-bold text-[#0B1220]">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{pillar.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
