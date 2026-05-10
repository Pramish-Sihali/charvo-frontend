import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[color:var(--background)] disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--accent)] text-zinc-900 hover:bg-[color:var(--accent-strong)] focus:ring-[color:var(--accent)]",
  secondary:
    "bg-[color:var(--surface-2)] text-[color:var(--foreground)] hover:bg-[color:var(--border)] border border-[color:var(--border)]",
  ghost:
    "bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--surface-2)]",
};

export function Button({
  variant = "primary",
  fullWidth,
  className = "",
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;
  return <button className={cls} {...rest} />;
}
