export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="animate-fade-up flex flex-col gap-4 border-b border-rule pb-8">
      <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
        {eyebrow}
      </span>
      <h1 className="text-2xl font-medium leading-9 tracking-[0.06em]">
        {title}
      </h1>
      <p className="max-w-2xl text-sm leading-7 text-muted">{description}</p>
    </div>
  );
}
