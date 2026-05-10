import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FAQAccordion } from "../components/FAQAccordion";
import { HeroBlock } from "../components/HeroBlock";

const features = [
  {
    title: "Activated carbon core",
    body: "High-surface-area coconut-shell carbon adsorbs tar and particulates as smoke passes through.",
  },
  {
    title: "Fits AS & rolling tobacco",
    body: "Industry-standard 6 mm tip slots into American Spirit cigarettes and standard rolling papers.",
  },
  {
    title: "Pinch-resistant tip",
    body: "Rigid honeycomb mouthpiece keeps shape under pressure so the airway never collapses.",
  },
];

const faqs = [
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
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroBlock />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className="bg-[color:var(--surface-1)] border-[color:var(--border)] hover:border-[color:var(--accent)]/40 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[color:var(--muted)] leading-relaxed">
                {f.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Honest answers</h2>
        <FAQAccordion items={faqs} />
      </section>
    </div>
  );
}
