import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] font-medium">
      {children}
    </p>
  );
}
