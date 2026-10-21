import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Скачать IDE — SPIDER",
  description: "Загрузите SPIDER IDE для Windows.",
};

const DOWNLOAD_URL =
  "https://archive.org/download/spider-ide/SpiderIDE.exe";

const PLATFORMS = [
  {
    os: "Windows",
    arch: "x64",
    file: "SpiderIDE.exe",
    note: "Windows 10 и новее",
    url: DOWNLOAD_URL,
  },
  {
    os: "macOS",
    arch: "Universal",
    file: "spider.dmg",
    note: "скоро",
    url: null,
  },
  {
    os: "Linux",
    arch: "x86_64",
    file: "spider.AppImage",
    note: "скоро",
    url: null,
  },
];

export default function DownloadPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 py-12">
      <PageHeader
        eyebrow="загрузка"
        title="Скачать SPIDER IDE"
        description="Последняя стабильная версия 1.0.0 для Windows. macOS и Linux — в разработке."
      />

      <Reveal delay={100}>
        <a
          href={DOWNLOAD_URL}
          className="group flex items-center justify-between gap-4 border border-foreground px-6 py-5 transition-all duration-300 hover:bg-foreground hover:text-background active:scale-[0.99]"
        >
          <span className="flex flex-col gap-1">
            <span className="text-base tracking-[0.06em]">SpiderIDE.exe</span>
            <span className="text-[11px] uppercase tracking-[0.2em] opacity-70">
              Windows x64 · версия 1.0.0
            </span>
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em]">
            Скачать ↓
          </span>
        </a>
      </Reveal>

      <Reveal delay={180}>
        <div className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
          {PLATFORMS.map((p) => (
            <div
              key={p.os}
              className="flex flex-col gap-4 bg-panel px-5 py-6"
            >
              <div className="flex flex-col gap-1">
                <span className="text-lg tracking-[0.06em]">{p.os}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  {p.arch} · {p.note}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-end gap-3">
                <span className="text-[11px] text-muted">{p.file}</span>
                {p.url ? (
                  <a
                    href={p.url}
                    className="flex h-10 items-center justify-center border border-foreground text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
                  >
                    Скачать
                  </a>
                ) : (
                  <span className="flex h-10 items-center justify-center border border-rule text-[11px] uppercase tracking-[0.2em] text-muted">
                    Недоступно
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
