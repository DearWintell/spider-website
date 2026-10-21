import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { POSTS } from "@/lib/news";

export const metadata: Metadata = {
  title: "Новости — SPIDER",
  description: "Новости, релизы и анонсы проекта SPIDER IDE.",
};

export default function NewsPage() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 py-12">
      <PageHeader
        eyebrow="новости"
        title="Новости проекта"
        description="Релизы, анонсы и обновления команды SPIDER."
      />

      <Reveal>
        <ul className="flex flex-col divide-y divide-rule border border-rule">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/news/${post.slug}`}
                className="flex flex-col gap-3 bg-panel px-5 py-6 transition-colors hover:bg-foreground hover:text-background"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <time
                    dateTime={post.date}
                    className="text-[11px] tracking-[0.2em] opacity-70"
                  >
                    {post.date}
                  </time>
                  <span className="border border-rule px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] opacity-70">
                    {post.tag}
                  </span>
                </div>
                <h2 className="text-base tracking-[0.06em]">{post.title}</h2>
                <p className="max-w-2xl text-sm leading-7 opacity-70">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
