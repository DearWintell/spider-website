import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocBlocks } from "@/components/doc-blocks";
import { DOCS, getDoc } from "@/lib/docs";

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) {
    return { title: "Документация — SPIDER" };
  }

  return {
    title: `${doc.title} — Документация SPIDER`,
    description: doc.description,
  };
}

export default async function DocArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) {
    notFound();
  }

  const index = DOCS.findIndex((d) => d.slug === doc.slug);
  const prev = index > 0 ? DOCS[index - 1] : null;
  const next = index < DOCS.length - 1 ? DOCS[index + 1] : null;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 py-12">
      <div className="animate-fade-up flex flex-col gap-6 border-b border-rule pb-8">
        <Link
          href="/docs"
          className="text-[11px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-foreground"
        >
          ← Документация
        </Link>
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
            {doc.section}
          </span>
          <h1 className="text-2xl font-medium leading-9 tracking-[0.06em]">
            {doc.title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            {doc.description}
          </p>
        </div>
      </div>

      <DocBlocks blocks={doc.blocks} />

      <nav className="flex items-stretch gap-px border border-rule bg-rule">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="flex flex-1 flex-col gap-1 bg-panel px-4 py-4 transition-colors hover:bg-foreground hover:text-background"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] opacity-70">
              ← Назад
            </span>
            <span className="text-sm">{prev.title}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="flex flex-1 flex-col items-end gap-1 bg-panel px-4 py-4 text-right transition-colors hover:bg-foreground hover:text-background"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] opacity-70">
              Далее →
            </span>
            <span className="text-sm">{next.title}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </div>
  );
}
