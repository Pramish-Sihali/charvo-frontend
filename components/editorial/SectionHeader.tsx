import type { ReactNode } from "react";

export function SectionHeader({
  number,
  label,
  title,
  blurb,
}: {
  number: string; // e.g. "01"
  label: string;  // e.g. "Filters"
  title: ReactNode;
  blurb?: ReactNode;
}) {
  return (
    <header className="grid gap-8 md:grid-cols-12 border-t border-[color:var(--border)] pt-10">
      <div className="md:col-span-4 flex items-baseline gap-3">
        <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] font-medium">
          CX/{number}
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--subtle)]">
          — {label}
        </span>
      </div>
      <div className="md:col-span-8">
        <h2
          className="leading-[0.95] tracking-tight"
          style={{ fontSize: "var(--text-4xl)" }}
        >
          {title}
        </h2>
        {blurb ? (
          <p className="mt-6 max-w-xl text-base text-[color:var(--muted)] leading-relaxed">
            {blurb}
          </p>
        ) : null}
      </div>
    </header>
  );
}
