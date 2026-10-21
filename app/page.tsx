import Link from "next/link";
import { NewsWidget } from "@/components/news-widget";
import { Reveal } from "@/components/reveal";
import { SpiderBackground } from "@/components/spider-background";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-12 overflow-hidden py-16">
      <SpiderBackground />
      <div
        className="bg-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-3xl flex-col items-center gap-8 px-6 sm:items-start">
        <span
          className="animate-fade-up border border-rule px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-muted"
          style={{ animationDelay: "0ms" }}
        >
          integrated development environment
        </span>

        <h1
          className="animate-fade-up max-w-md text-3xl font-medium leading-11 tracking-[0.06em]"
          style={{ animationDelay: "80ms" }}
        >
          SPIDER — среда разработки для тех, кто пишет быстро
        </h1>

        <p
          className="animate-fade-up max-w-md text-sm leading-7 text-muted"
          style={{ animationDelay: "160ms" }}
        >
          Лёгкая, расширяемая IDE с встроенным интерпретатором, интеллектуальным
          автодополнением и поддержкой множества языков. Откройте проект и
          начните писать код за секунды.
        </p>

        <div
          className="animate-fade-up flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            className="flex h-11 items-center justify-center border border-foreground px-6 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-foreground hover:text-background active:scale-[0.98]"
            href="/download"
          >
            Скачать IDE
          </Link>
          <Link
            className="flex h-11 items-center justify-center border border-rule px-6 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-foreground active:scale-[0.98]"
            href="/docs"
          >
            Документация
          </Link>
        </div>
      </div>

      <Reveal className="relative w-full max-w-3xl px-6" delay={120}>
        <NewsWidget />
      </Reveal>
    </div>
  );
}
