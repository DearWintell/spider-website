import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "О проекте — SPIDER",
  description: "Миссия, принципы и история проекта SPIDER IDE.",
};

const PRINCIPLES = [
  [
    "Скорость",
    "IDE запускается за доли секунды и не тормозит на больших проектах — ресурсы расходуются только там, где они нужны.",
  ],
  [
    "Открытость",
    "Исходный код проекта открыт, а API расширений документирован — вклад может сделать каждый.",
  ],
  [
    "Приватность",
    "Телеметрия отключена по умолчанию. Ваши код и настройки остаются на вашей машине.",
  ],
  [
    "Переносимость",
    "Одинаковое поведение на Windows, macOS и Linux: общие настройки, горячие клавиши и плагины.",
  ],
];

const TIMELINE = [
  ["2024", "Первая концепция и прототип редактора на собственном рендерере."],
  ["2025", "Публикация бета-версии, реестр плагинов и интеграция с Git."],
  ["2026", "Релиз 1.0.0: стабильный API расширений и поддержка LSP."],
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 py-12">
      <PageHeader
        eyebrow="о проекте"
        title="О проекте SPIDER"
        description="SPIDER — бесплатная открытая IDE, созданная командой энтузиастов для комфортной повседневной разработки."
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted">
          Миссия
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-muted">
          Мы считаем, что инструменты разработки не должны мешать работе:
          не заставляют ждать сборку, не собирают данные и не привязывают к
          конкретной платформе. SPIDER делает ставку на предсказуемость,
          простоту и открытость — вы всегда можете посмотреть, как работает
          редактор, и изменить его под себя.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted">
          Принципы
        </h2>
        <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {PRINCIPLES.map(([title, desc]) => (
            <div key={title} className="flex flex-col gap-2 bg-panel px-5 py-5">
              <span className="text-sm tracking-[0.06em]">{title}</span>
              <span className="text-xs leading-6 text-muted">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted">
          История
        </h2>
        <ul className="flex flex-col divide-y divide-rule border border-rule">
          {TIMELINE.map(([year, text]) => (
            <li
              key={year}
              className="flex flex-col gap-1 bg-panel px-4 py-4 sm:flex-row sm:gap-6"
            >
              <span className="w-16 shrink-0 text-[11px] tracking-[0.2em] text-muted">
                {year}
              </span>
              <span className="text-sm leading-7">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted">
          Участие
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-muted">
          Проект развивается открытой командой. Присоединяйтесь: читайте
          документацию, отправляйте отчёты об ошибках и предлагайте улучшения.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="flex h-11 items-center justify-center border border-foreground px-6 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
            href="/authors"
          >
            Авторы
          </Link>
          <Link
            className="flex h-11 items-center justify-center border border-rule px-6 text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-foreground"
            href="/news"
          >
            Новости проекта
          </Link>
        </div>
      </section>
    </div>
  );
}
