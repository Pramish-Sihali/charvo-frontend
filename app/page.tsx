import Link from "next/link";

import { Asterisk } from "../components/editorial/Asterisk";
import { Display } from "../components/editorial/Display";
import { Eyebrow } from "../components/editorial/Eyebrow";
import { SectionHeader } from "../components/editorial/SectionHeader";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      {/* Hero ----------------------------------------------------------- */}
      <section className="pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="grid gap-16 md:grid-cols-12 items-end">
          <div className="md:col-span-9">
            <Eyebrow>CX/00 — Index</Eyebrow>
            <h1
              className="mt-8 leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-display)" }}
            >
              Smoke <Display>smarter.</Display>
              <br />
              Filter the <Display>harsh</Display> stuff.
            </h1>
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <p className="text-base text-[color:var(--muted)] leading-relaxed">
              Slim 6&nbsp;mm activated charcoal filter tips that adsorb tar and particulate before it hits your throat. Fits American Spirit and hand-rolled tobacco.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-between border-b border-[color:var(--foreground)] pb-3 text-sm uppercase tracking-[0.2em] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
              >
                <span>Shop filters</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/science"
                className="inline-flex items-center justify-between border-b border-[color:var(--border)] pb-3 text-sm uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors"
              >
                <span>Read the science</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <dl className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 border-t border-[color:var(--border)] pt-10">
          {[
            { k: "6 mm", v: "Industry-standard tip" },
            { k: "≤ 30 s", v: "Saturation per cigarette" },
            { k: "1×", v: "Single-use, by design" },
            { k: "0", v: "Health claims" },
          ].map(({ k, v }) => (
            <div key={k}>
              <p
                className="leading-none tracking-tight"
                style={{ fontSize: "var(--text-3xl)" }}
              >
                {k}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
                {v}
              </p>
            </div>
          ))}
        </dl>
      </section>

      <Asterisk />

      {/* Features ------------------------------------------------------- */}
      <section className="pb-32">
        <SectionHeader
          number="01"
          label="What it does"
          title={
            <>
              Three things, <Display>well.</Display>
            </>
          }
          blurb="No tricks. The filter does a few specific things; everything else is your own choice."
        />
        <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-3">
          {[
            {
              n: "i",
              t: "Activated carbon core",
              b: "High-surface-area coconut-shell carbon adsorbs tar and particulates as smoke passes through. A single gram has roughly the surface area of a football field.",
            },
            {
              n: "ii",
              t: "Fits AS & rolling tobacco",
              b: "Industry-standard 6 mm tip slots into American Spirit cigarettes and standard rolling papers. No adapter, no fuss.",
            },
            {
              n: "iii",
              t: "Pinch-resistant tip",
              b: "Rigid honeycomb mouthpiece keeps shape under pressure so the airway never collapses, even after a full draw.",
            },
          ].map(({ n, t, b }) => (
            <article key={t} className="border-t border-[color:var(--border)] pt-6">
              <p
                className="italic text-[color:var(--accent)]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-2xl)" }}
              >
                {n}.
              </p>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{t}</h3>
              <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
                {b}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Asterisk />

      {/* Honest answers ------------------------------------------------- */}
      <section className="pb-32">
        <SectionHeader
          number="02"
          label="Honest answers"
          title={
            <>
              Plain speech, <Display>no spin.</Display>
            </>
          }
        />
        <div className="mt-16 divide-y divide-[color:var(--border)] border-t border-b border-[color:var(--border)]">
          {[
            {
              q: "Does this make smoking safe?",
              a: "No. Smoking remains harmful. CharcoalX is a harm-reduction filter that adsorbs particulate and tar for a cleaner draw — not a health product, and not a substitute for quitting.",
            },
            {
              q: "Will it ruin the flavor?",
              a: "It removes some particulate and acrid notes. Most people describe the draw as smoother, not flavorless. Strong tobaccos still taste like themselves.",
            },
            {
              q: "Single-use?",
              a: "Yes. Activated carbon saturates as it works. Reusing a filter past one cigarette stops giving you the benefit you paid for.",
            },
            {
              q: "How is the carbon sourced?",
              a: "Coconut-shell, food-grade, steam-activated. We test every batch on a smoking machine and publish per-batch reductions on the order receipt.",
            },
          ].map(({ q, a }, i) => (
            <details key={q} className="group py-8 [&[open]]:bg-[color:var(--surface-2)]/30 px-2 -mx-2">
              <summary className="flex items-baseline justify-between gap-8 cursor-pointer list-none">
                <div className="flex items-baseline gap-6">
                  <span
                    className="italic text-[color:var(--accent)] shrink-0"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-medium tracking-tight">{q}</p>
                </div>
                <span
                  className="shrink-0 text-[color:var(--muted)] transition-transform group-open:rotate-45 text-xl leading-none"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-4 ml-12 max-w-2xl text-sm text-[color:var(--muted)] leading-relaxed">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <Asterisk />

      {/* CTA strip ------------------------------------------------------ */}
      <section className="pb-32">
        <div className="grid gap-8 md:grid-cols-12 items-end border-t border-[color:var(--border)] pt-12">
          <div className="md:col-span-8">
            <h2
              className="leading-[0.95] tracking-tight"
              style={{ fontSize: "var(--text-4xl)" }}
            >
              Ready when you are. <Display>No hurry.</Display>
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 border-b border-[color:var(--foreground)] pb-2 text-sm uppercase tracking-[0.2em] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
            >
              Shop the line <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
