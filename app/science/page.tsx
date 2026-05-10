import type { Metadata } from "next";

import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { ScienceDiagram } from "../../components/ScienceDiagram";

export const metadata: Metadata = {
  title: "How CharcoalX works — activated carbon adsorption",
  description:
    "Plain explanation of how activated carbon filters reduce particulate and tar — and what they don't do.",
};

export default function SciencePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-12">
      <header>
        <p className="text-xs uppercase tracking-wider text-[color:var(--accent)] font-semibold">
          The science
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">How it works</h1>
        <p className="mt-3 text-base text-[color:var(--muted)] leading-relaxed">
          A short, honest walk-through of activated carbon adsorption — what the filter does to the smoke that passes through it, and the things it deliberately does not claim to do.
        </p>
      </header>

      <div className="flex justify-center">
        <ScienceDiagram />
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">What activated carbon does</h2>
        <p className="text-sm text-[color:var(--muted)] leading-relaxed">
          Activated carbon is heated coconut-shell carbon riddled with microscopic pores — a single gram has roughly the surface area of a football field. As smoke is drawn through the tip, larger tar particles and reactive volatile compounds bind to those pore walls (adsorption, not absorption). The result is a noticeably lighter, less acrid draw.
        </p>
      </section>

      <Separator className="bg-[color:var(--border)]" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">What it does not do</h2>
        <Card className="bg-[color:var(--surface-1)] border-[color:var(--danger)]/40">
          <CardContent className="pt-6 text-sm text-[color:var(--muted)] leading-relaxed space-y-3">
            <p><strong className="text-[color:var(--foreground)]">It does not make smoking safe.</strong> Combustion produces carbon monoxide and gas-phase toxicants that activated carbon does not meaningfully remove.</p>
            <p><strong className="text-[color:var(--foreground)]">It does not replace quitting.</strong> If quitting is on the table, choose that. CharcoalX is a harm-reduction tool for people who are going to smoke regardless.</p>
            <p><strong className="text-[color:var(--foreground)]">It does not last beyond one cigarette.</strong> Carbon saturates as it works. Reusing a tip wastes the only thing you bought it for.</p>
          </CardContent>
        </Card>
      </section>

      <Separator className="bg-[color:var(--border)]" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">How we test</h2>
        <p className="text-sm text-[color:var(--muted)] leading-relaxed">
          Every batch is sampled and run through gravimetric tar capture against a control filter on a smoking machine. We publish per-batch reductions on the order receipt. We do not publish health claims.
        </p>
      </section>

      <Separator className="bg-[color:var(--border)]" />

      <section className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">References</h2>
        <ul className="text-xs text-[color:var(--subtle)] space-y-1 list-disc pl-5">
          <li>WHO (2021). Tobacco-product harm reduction overview.</li>
          <li>National Institute on Drug Abuse — activated carbon adsorption mechanics.</li>
        </ul>
      </section>
    </div>
  );
}
