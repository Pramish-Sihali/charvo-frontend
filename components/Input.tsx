import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, id, className = "", ...rest }: Props) {
  const inputId = id ?? rest.name;
  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      {label && (
        <span className="text-sm font-medium text-[color:var(--foreground)]">
          {label}
        </span>
      )}
      <input
        id={inputId}
        className={`rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] px-3.5 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--accent)] ${className}`}
        {...rest}
      />
    </label>
  );
}
