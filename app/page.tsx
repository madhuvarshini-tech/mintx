import type { Metadata } from "next";
import { AboutBand, ContactBand, Process, ProductBand, Services, WorkShowcase } from "@/components/home-sections";
import { Hero } from "@/components/hero";
import { published } from "@/lib/content";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "MintX Solutions | Web development and digital marketing in Salem",
  description:
    "MintX Solutions builds websites, online stores, mobile apps, and digital marketing for businesses in Salem, Tamil Nadu.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const content = getContent();
  const services = published(content.services);
  const projects = published(content.projects);
  return (
    <>
      <Hero />
      <Services services={services} />
      <ProductBand product={content.product} />
      <WorkShowcase projects={projects} />
      <Process />
      <AboutBand />
      <ContactBand settings={content.settings} services={services.map((service) => service.title)} />
    </>
  );
}
