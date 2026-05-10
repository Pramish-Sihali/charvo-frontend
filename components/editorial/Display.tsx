import type { ReactNode } from "react";

export function Display({ children }: { children: ReactNode }) {
  return (
    <span
      className="italic text-[color:var(--accent)]"
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </span>
  );
}
