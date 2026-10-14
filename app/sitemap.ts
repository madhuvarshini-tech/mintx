<<<<<<< HEAD
import type { MetadataRoute } from "next";
import { published } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { getContent } from "@/lib/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const content = getContent();
  const staticRoutes = ["", "/services", "/products", "/work", "/about", "/contact", "/blog", "/careers", "/privacy", "/terms"];
  const pages = staticRoutes.map((route) => ({ url: `${base}${route || "/"}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 }));
  const services = published(content.services).map((service) => ({ url: `${base}/services/${service.slug}` }));
  const projects = published(content.projects).map((project) => ({ url: `${base}/work/${project.slug}` }));
  const posts = published(content.posts).map((post) => ({ url: `${base}/blog/${post.slug}` }));
  return [...pages, ...services, ...projects, ...posts];
}
=======
import type { MetadataRoute } from "next";
import { published } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { getContent } from "@/lib/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const content = getContent();
  const staticRoutes = ["", "/services", "/products", "/work", "/about", "/contact", "/blog", "/careers", "/privacy", "/terms"];
  const pages = staticRoutes.map((route) => ({ url: `${base}${route || "/"}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 }));
  const services = published(content.services).map((service) => ({ url: `${base}/services/${service.slug}` }));
  const projects = published(content.projects).map((project) => ({ url: `${base}/work/${project.slug}` }));
  const posts = published(content.posts).map((post) => ({ url: `${base}/blog/${post.slug}` }));
  return [...pages, ...services, ...projects, ...posts];
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
