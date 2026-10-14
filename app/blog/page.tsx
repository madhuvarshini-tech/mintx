import type { Metadata } from "next";
import Link from "next/link";
import { Sparkle, ArrowUpRight, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";
import { published } from "@/lib/content";
import { formatDate } from "@/lib/site";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Studio Insights & Notes",
  description: "Notes, perspectives, and practical technical insights on modern web development, applications, and search optimization from MintX Solutions.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = published(getContent().posts);
  return (
    <section className="mx-auto max-w-[1100px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0f766e]">
          <Sparkle size={14} weight="fill" className="text-[#14b8a6]" />
          <span>Studio Perspectives & Research</span>
        </div>
        <h1 className="display mt-4 text-4xl sm:text-6xl md:text-7xl text-[#0b1320]">
          Notes from the atelier.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#475569]">
          Essays and practical perspectives on modern software architecture, conversion design, and building resilient businesses online.
        </p>
      </div>

      <div className="mt-16 grid gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="card-glass group rounded-3xl p-8 md:p-10 transition-all duration-300 hover:border-[#0d9488]/30 hover:shadow-xl"
          >
            <div className="flex items-center gap-4 text-xs font-semibold text-[#475569]">
              <span className="flex items-center gap-1">
                <CalendarBlank size={14} className="text-[#0d9488]" /> {formatDate(post.date)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> 4 min read
              </span>
            </div>

            <h2 className="display mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 group-hover:text-[#0d9488] transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#475569] max-w-[72ch]">
              {post.paragraphs[0]}
            </p>

            <div className="mt-8 border-t border-slate-900/5 pt-5 flex items-center justify-between">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d9488] group-hover:translate-x-1 transition-transform"
              >
                Read full article <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}

        {posts.length === 0 ? (
          <p className="py-12 text-[#475569]">No posts published yet.</p>
        ) : null}
      </div>
    </section>
  );
}
