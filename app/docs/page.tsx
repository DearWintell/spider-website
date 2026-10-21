import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { DOC_SECTIONS, DOCS } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Документация — SPIDER",
  description:
    "Руководства, справочники и инструкции по использованию SPIDER IDE.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 py-12">
      <PageHeader
        eyebrow="документация"
        title="Документация"
        description="Всё о языке Spider Script: обзор, синтаксис, команды и примеры."
      />

      <div className="flex flex-col gap-10">
        {DOC_SECTIONS.map((section, i) => (
          <Reveal key={section} delay={i * 80}>
            <section className="flex flex-col gap-4">
              <h2 className="border-b border-rule pb-3 text-[11px] uppercase tracking-[0.3em] text-muted">
                {section}
              </h2>

              <ul className="flex flex-col divide-y divide-rule border border-rule">
                {DOCS.filter((d) => d.section === section).map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      href={`/docs/${doc.slug}`}
                      className="flex flex-col gap-1 bg-panel px-4 py-4 transition-colors hover:bg-foreground hover:text-background"
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-sm tracking-[0.04em]">
                          {doc.title}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.2em] opacity-70">
                          →
                        </span>
                      </span>
                      <span className="text-xs leading-6 opacity-70">
                        {doc.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
