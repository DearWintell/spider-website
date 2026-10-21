import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { POSTS, getPost } from "@/lib/news";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Новости — SPIDER" };
  }

  return {
    title: `${post.title} — Новости SPIDER`,
    description: post.excerpt,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-12">
      <div className="animate-fade-up flex flex-col gap-6 border-b border-rule pb-8">
        <Link
          href="/news"
          className="text-[11px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-foreground"
        >
          ← Новости
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <time
            dateTime={post.date}
            className="text-[11px] tracking-[0.2em] text-muted"
          >
            {post.date}
          </time>
          <span className="border border-rule px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-muted">
            {post.tag}
          </span>
        </div>
        <h1 className="text-2xl font-medium leading-9 tracking-[0.06em]">
          {post.title}
        </h1>
      </div>

      <Reveal className="flex flex-col gap-5">
        {post.content.map((paragraph, i) => (
          <p key={i} className="max-w-2xl text-sm leading-7 text-muted">
            {paragraph}
          </p>
        ))}
      </Reveal>
    </div>
  );
}
