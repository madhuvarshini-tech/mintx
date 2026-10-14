import type { Metadata } from "next";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { published } from "@/lib/content";
import { getContent } from "@/lib/store";
import { WorkGallery } from "@/components/work-gallery";

export const metadata: Metadata = {
  title: "Selected Client Work",
  description: "Explore 22+ custom digital platforms, web systems, and high-performance websites engineered by MintX Solutions across India.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const projects = published(getContent().projects);
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0f766e]">
          <Sparkle size={14} weight="fill" className="text-[#14b8a6]" />
          <span>Proven Digital Engineering · 22+ Deployments</span>
        </div>
        <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0b1320]">
          Websites & platforms we have shipped.
        </h1>
        <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#475569]">
          Explore {projects.length} real-world client platforms built and launched with speed, clean architecture, and conversion focus for businesses across India.
        </p>
      </div>

      <WorkGallery projects={projects} />
    </section>
  );
}
