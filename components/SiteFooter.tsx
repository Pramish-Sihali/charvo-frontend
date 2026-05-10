import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-[color:var(--border)]">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-6">
            <p
              className="leading-[0.95] tracking-tight"
              style={{ fontSize: "var(--text-5xl)" }}
            >
              Smoke{" "}
              <span
                className="italic text-[color:var(--accent)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                smarter.
              </span>
            </p>
            <p className="mt-6 max-w-md text-sm text-[color:var(--muted)] leading-relaxed">
              Slim 6 mm activated charcoal filter tips. Harm reduction, not a health claim.
            </p>
          </div>
          <nav className="md:col-span-3 space-y-3 text-sm">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--subtle)]">
              Shop
            </p>
            <Link href="/products" className="block hover:text-[color:var(--accent)]">Filters</Link>
            <Link href="/science" className="block hover:text-[color:var(--accent)]">How it works</Link>
          </nav>
          <nav className="md:col-span-3 space-y-3 text-sm">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--subtle)]">
              Account
            </p>
            <Link href="/orders" className="block hover:text-[color:var(--accent)]">Orders</Link>
            <Link href="/login" className="block hover:text-[color:var(--accent)]">Sign in</Link>
          </nav>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--border)] pt-6 text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
          <p>© {new Date().getFullYear()} CharcoalX</p>
          <p>Harm reduction. Not a health claim.</p>
        </div>
      </div>
    </footer>
  );
}
