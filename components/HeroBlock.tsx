// Source: fallback — 21st.dev builder returned no usable code; hand-built per task spec
import Link from "next/link";

export function HeroBlock() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[color:var(--surface-1)] via-[color:var(--background)] to-[color:var(--background)]"
      />
      <div
        aria-hidden
        className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-[color:var(--accent)]/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              Harm reduction. Not a health claim.
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
              Smoke smarter.
              <br />
              <span className="text-[color:var(--accent)]">Filter the harsh stuff.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-[color:var(--muted)] leading-relaxed">
              Slim 6 mm activated charcoal filter tips that adsorb tar and particulate before it hits your throat. Fits American Spirit and hand-rolled tobacco.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-md bg-[color:var(--accent)] px-5 py-3 text-sm font-medium text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent-strong)] transition"
              >
                Shop filters →
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-[color:var(--border)] bg-transparent px-5 py-3 text-sm font-medium hover:bg-[color:var(--surface-2)] transition"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 320 320" className="w-full max-w-sm text-[color:var(--accent)]" fill="none" aria-hidden>
              <circle cx="160" cy="160" r="120" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
              <circle cx="160" cy="160" r="80" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
              <circle cx="160" cy="160" r="40" fill="currentColor" fillOpacity="0.15" />
              <rect x="120" y="60" width="80" height="200" rx="40" stroke="currentColor" strokeWidth="2" fill="var(--surface-1)" />
              <rect x="120" y="60" width="80" height="50" rx="40" fill="currentColor" fillOpacity="0.85" />
              <line x1="140" y1="125" x2="180" y2="125" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="140" y1="145" x2="180" y2="145" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="140" y1="165" x2="180" y2="165" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="140" y1="185" x2="180" y2="185" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
