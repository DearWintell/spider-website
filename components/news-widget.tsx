import Link from "next/link";
import { POSTS } from "@/lib/news";

export function NewsWidget() {
  const latest = [...POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="w-full max-w-3xl border border-rule">
      <div className="flex items-center gap-3 border-b border-rule bg-panel px-4 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="news-dot h-2 w-2 border border-rule" />
          <span className="news-dot h-2 w-2 border border-rule" />
          <span className="news-dot h-2 w-2 border border-rule" />
        </span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
          {"// news"}
        </span>
      </div>

      <ul className="flex flex-col divide-y divide-rule">
        {latest.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/news/${post.slug}`}
              className="flex flex-col gap-1 bg-panel px-4 py-3 transition-colors hover:bg-foreground hover:text-background"
            >
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <time
                  dateTime={post.date}
                  className="text-[10px] tracking-[0.2em] opacity-70"
                >
                  {post.date}
                </time>
                <span className="border border-rule px-1.5 py-px text-[10px] uppercase tracking-[0.2em] opacity-70">
                  {post.tag}
                </span>
              </span>
              <span className="text-sm tracking-[0.04em]">{post.title}</span>
              <span className="text-xs leading-5 opacity-70">
                {post.excerpt}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-rule bg-panel px-4 py-2">
        <Link
          href="/news"
          className="text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
        >
          все новости →
        </Link>
      </div>
    </div>
  );
}
