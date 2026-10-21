import type { DocBlock } from "@/lib/docs";
import { Reveal } from "@/components/reveal";

export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <Reveal className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h":
            return (
              <h2
                key={i}
                className="border-b border-rule pb-2 text-[11px] uppercase tracking-[0.3em] text-muted"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="max-w-2xl text-sm leading-7 text-muted">
                {block.text}
              </p>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List
                key={i}
                className={`flex max-w-2xl flex-col gap-2 text-sm leading-7 text-muted ${
                  block.ordered ? "list-decimal" : "list-disc"
                } pl-5`}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </List>
            );
          }
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto border border-rule bg-panel px-4 py-3 text-xs leading-6"
              >
                <code>{block.code}</code>
              </pre>
            );
        }
      })}
    </Reveal>
  );
}
