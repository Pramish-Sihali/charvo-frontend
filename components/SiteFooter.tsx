import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface-1)]/60 mt-16">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold tracking-tight">CharcoalX</p>
          <p className="mt-2 text-xs text-[color:var(--muted)] leading-relaxed max-w-xs">
            Slim 6 mm activated charcoal filter tips. Harm reduction, not a health claim.
          </p>
        </div>
        <nav className="text-sm space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--subtle)]">Shop</p>
          <Link href="/products" className="block text-[color:var(--muted)] hover:text-[color:var(--foreground)]">Filters</Link>
          <Link href="/science" className="block text-[color:var(--muted)] hover:text-[color:var(--foreground)]">How it works</Link>
        </nav>
        <nav className="text-sm space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--subtle)]">Account</p>
          <Link href="/orders" className="block text-[color:var(--muted)] hover:text-[color:var(--foreground)]">Orders</Link>
          <Link href="/login" className="block text-[color:var(--muted)] hover:text-[color:var(--foreground)]">Sign in</Link>
        </nav>
      </div>
      <p className="border-t border-[color:var(--border)] py-4 text-center text-xs text-[color:var(--subtle)]">
        © {new Date().getFullYear()} CharcoalX
      </p>
    </footer>
  );
}
