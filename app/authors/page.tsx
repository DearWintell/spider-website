import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Авторы — SPIDER",
  description: "Команды, создающие SPIDER IDE и язык Spider Script.",
};

const TEAMS = [
  {
    monogram: "PE",
    name: "project.exe studio",
    role: "Разработка IDE",
    bio: "Команда, создающая SPIDER IDE: ядро редактора, отладчик, терминал, интеграция с Git и система расширений.",
    items: ["Ядро редактора", "Отладка и терминал", "Реестр плагинов"],
  },
  {
    monogram: "SS",
    name: "Spider Script Studio",
    role: "Разработка языка",
    bio: "Команда, создающая язык Spider Script: интерпретатор, синтаксис, команды интерфейса и официальная документация.",
    items: ["Интерпретатор", "Синтаксис и команды", "Документация"],
  },
];

export default function AuthorsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 py-12">
      <PageHeader
        eyebrow="авторы"
        title="Авторы проекта"
        description="SPIDER разрабатывается двумя студиями: project.exe studio отвечает за IDE, Spider Script Studio — за язык Spider Script."
      />

      <Reveal>
        <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {TEAMS.map((team) => (
          <div key={team.name} className="flex flex-col gap-4 bg-panel px-6 py-8">
            <div className="flex h-14 w-14 items-center justify-center border border-rule text-sm tracking-[0.2em] text-muted">
              {team.monogram}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-base tracking-[0.06em]">{team.name}</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                {team.role}
              </span>
            </div>

            <p className="text-xs leading-6 text-muted">{team.bio}</p>

            <ul className="mt-auto flex flex-col gap-2 border-t border-rule pt-4">
              {team.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-muted"
                >
                  <span aria-hidden="true">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      </Reveal>

      <section className="flex flex-col gap-4">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted">
          Хотите в команду?
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-muted">
          Мы всегда рады контрибьюторам: код, переводы, дизайн и примеры —
          всё вкладывается через issues и pull request.
        </p>
      </section>
    </div>
  );
}
