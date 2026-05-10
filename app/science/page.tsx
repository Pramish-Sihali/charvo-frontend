import type { Metadata } from "next";

import { Asterisk } from "../../components/editorial/Asterisk";
import { Display } from "../../components/editorial/Display";
import { Eyebrow } from "../../components/editorial/Eyebrow";
import { ScienceDiagram } from "../../components/ScienceDiagram";

export const metadata: Metadata = {
  title: "How CharcoalX works — activated carbon adsorption",
  description:
    "Plain explanation of how activated carbon filters reduce particulate and tar — and what they don't do.",
};

export default function SciencePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      {/* Header ---------------------------------------------------------- */}
      <header className="pt-20 md:pt-32 pb-20">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-9">
            <Eyebrow>CX/02 — Science</Eyebrow>
            <h1
              className="mt-8 leading-[0.92] tracking-tight"
              style={{ fontSize: "var(--text-display)" }}
            >
              How it <Display>works.</Display>
            </h1>
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <p className="text-base text-[color:var(--muted)] leading-relaxed">
              A short, honest walk-through of activated carbon adsorption — what the filter does, and the things it does not claim.
            </p>
          </div>
        </div>
      </header>

      {/* Diagram --------------------------------------------------------- */}
      <section className="border-t border-[color:var(--border)] pt-16 pb-24">
        <div className="flex justify-center">
          <ScienceDiagram />
        </div>
        <p className="mt-8 text-center text-[11px] uppercase tracking-[0.22em] text-[color:var(--subtle)]">
          fig.&nbsp;01 — adsorption flow through a 6 mm activated charcoal tip
        </p>
      </section>

      <Asterisk />

      {/* Body — three editorial sections -------------------------------- */}
      <article className="pb-24 max-w-3xl mx-auto">
        <section className="border-t border-[color:var(--border)] pt-10">
          <Eyebrow>§ 01</Eyebrow>
          <h2
            className="mt-4 leading-tight tracking-tight"
            style={{ fontSize: "var(--text-3xl)" }}
          >
            What activated carbon <Display>does.</Display>
          </h2>
          <p className="mt-6 text-lg text-[color:var(--foreground)] leading-relaxed">
            Activated carbon is heated coconut-shell carbon riddled with microscopic pores — a single gram has roughly the surface area of a football field. As smoke is drawn through the tip, larger tar particles and reactive volatile compounds bind to those pore walls. The phenomenon is <em>adsorption</em>, not absorption — molecules adhere to a surface rather than dissolving into a substance.
          </p>
          <p className="mt-4 text-lg text-[color:var(--muted)] leading-relaxed">
            The result is a noticeably lighter, less acrid draw. You will still taste the tobacco; you will taste less of the burn.
          </p>
        </section>

        <section className="mt-20 border-t border-[color:var(--border)] pt-10">
          <Eyebrow>§ 02</Eyebrow>
          <h2
            className="mt-4 leading-tight tracking-tight"
            style={{ fontSize: "var(--text-3xl)" }}
          >
            What it does <Display>not</Display> do.
          </h2>
          <ul className="mt-8 space-y-8">
            <li>
              <p
                className="italic text-[color:var(--accent)]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)" }}
              >
                It does not make smoking safe.
              </p>
              <p className="mt-2 text-base text-[color:var(--muted)] leading-relaxed">
                Combustion produces carbon monoxide and gas-phase toxicants that activated carbon does not meaningfully remove.
              </p>
            </li>
            <li>
              <p
                className="italic text-[color:var(--accent)]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)" }}
              >
                It does not replace quitting.
              </p>
              <p className="mt-2 text-base text-[color:var(--muted)] leading-relaxed">
                If quitting is on the table, choose that. CharcoalX is a harm-reduction tool for people who are going to smoke regardless.
              </p>
            </li>
            <li>
              <p
                className="italic text-[color:var(--accent)]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)" }}
              >
                It does not last beyond one cigarette.
              </p>
              <p className="mt-2 text-base text-[color:var(--muted)] leading-relaxed">
                Carbon saturates as it works. Reusing a tip wastes the only thing you bought it for.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-20 border-t border-[color:var(--border)] pt-10">
          <Eyebrow>§ 03</Eyebrow>
          <h2
            className="mt-4 leading-tight tracking-tight"
            style={{ fontSize: "var(--text-3xl)" }}
          >
            How we <Display>test.</Display>
          </h2>
          <p className="mt-6 text-lg text-[color:var(--foreground)] leading-relaxed">
            Every batch is sampled and run through gravimetric tar capture against a control filter on a smoking machine. We publish per-batch reductions on the order receipt. We do not publish health claims.
          </p>
        </section>

        <section className="mt-20 border-t border-[color:var(--border)] pt-10">
          <Eyebrow>References</Eyebrow>
          <ul className="mt-6 space-y-2 text-sm text-[color:var(--muted)]">
            <li>1. WHO (2021). Tobacco-product harm reduction overview.</li>
            <li>2. National Institute on Drug Abuse — activated carbon adsorption mechanics.</li>
            <li>3. ISO 4387:2019 — gravimetric determination of total particulate matter from smoking machines.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
