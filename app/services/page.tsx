<<<<<<< HEAD
import type { Metadata } from "next";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { published } from "@/lib/content";
import { getContent } from "@/lib/store";
import { ServicesList } from "@/components/services-list";

export const metadata: Metadata = {
  title: "Core Services",
  description: "Bespoke website engineering, custom e-commerce, mobile applications, and growth SEO marketing from MintX Solutions.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const services = published(getContent().services);
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40 overflow-x-clip">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0f766e]">
          <Sparkle size={14} weight="fill" className="text-[#14b8a6]" />
          <span>Full-Spectrum Digital Capabilities</span>
        </div>
        <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0b1320]">
          Services built around measurable results.
        </h1>
        <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#475569]">
          Every service is structured to drive qualified inquiries, seamless user experience, and scalable technical foundations.
        </p>
      </div>

      <ServicesList services={services} />
    </section>
  );
}
=======
import type { Metadata } from "next";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { published } from "@/lib/content";
import { getContent } from "@/lib/store";
import { ServicesList } from "@/components/services-list";

export const metadata: Metadata = {
  title: "Core Services",
  description: "Bespoke website engineering, custom e-commerce, mobile applications, and growth SEO marketing from MintX Solutions.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const services = published(getContent().services);
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-8 md:pt-40 overflow-x-clip">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0f766e]">
          <Sparkle size={14} weight="fill" className="text-[#14b8a6]" />
          <span>Full-Spectrum Digital Capabilities</span>
        </div>
        <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0b1320]">
          Services built around measurable results.
        </h1>
        <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#475569]">
          Every service is structured to drive qualified inquiries, seamless user experience, and scalable technical foundations.
        </p>
      </div>

      <ServicesList services={services} />
    </section>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
