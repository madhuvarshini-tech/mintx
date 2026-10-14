import type { Metadata } from "next";
import { ContactBand } from "@/components/home-sections";
import { published } from "@/lib/content";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with MintX Solutions in Salem. Call, email, WhatsApp, or send an inquiry.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const query = await searchParams;
  const content = getContent();
  const services = published(content.services);
  const preset = services.find((service) => service.title === query.service)?.title;
  return <ContactBand settings={content.settings} services={services.map((service) => service.title)} preset={preset} />;
}
