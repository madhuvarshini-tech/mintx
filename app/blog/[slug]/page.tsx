import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarBlank, Clock, User } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/site";
import { getContent } from "@/lib/store";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getContent().posts.find((item) => item.slug === slug && item.published);
  if (!post) return { title: "Note" };
  return { title: post.title, description: post.paragraphs[0], alternates: { canonical: `/blog/${post.slug}` } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getContent().posts.find((item) => item.slug === slug && item.published);
  if (!post) notFound();
  return (
    <article className="mx-auto max-w-[840px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back to studio insights
      </Link>

      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#475569]">
        <span className="flex items-center gap-1.5">
          <CalendarBlank size={14} className="text-[#0d9488]" /> {formatDate(post.date)}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} /> 4 min read
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <User size={14} /> MintX Solutions Editorial
        </span>
      </div>

      <h1 className="display mt-6 text-4xl sm:text-5xl md:text-6xl text-[#0b1320] leading-tight">
        {post.title}
      </h1>

      <div className="editorial-divider my-10" />

      <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-[#334155] font-normal">
        {post.paragraphs.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-[#0d9488]/20 bg-[#f0fdf9] p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Planning your next digital deployment?</h2>
          <p className="mt-1 text-sm text-[#475569]">Partner directly with our Salem studio engineering team.</p>
        </div>
        <Link href="/contact" className="btn btn-primary shrink-0">
          Start a project
        </Link>
      </div>
    </article>
  );
}
