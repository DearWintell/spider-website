"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/download", label: "Скачать IDE" },
  { href: "/docs", label: "Документация" },
  { href: "/about", label: "О проекте" },
  { href: "/authors", label: "Авторы" },
  { href: "/news", label: "Новости" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-rule bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3">
        <Link
          href="/"
          className="text-[15px] font-bold tracking-[0.3em] transition-colors hover:text-muted"
        >
          {"// "}
          SPIDER
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {NAV_LINKS.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative text-[11px] uppercase tracking-[0.2em] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${
                  active
                    ? "text-foreground after:w-full"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
