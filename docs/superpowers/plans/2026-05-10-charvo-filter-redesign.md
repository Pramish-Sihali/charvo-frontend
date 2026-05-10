# CharcoalX Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the `charvo-filter` storefront to a coherent shadcn/ui-based design system with two curated 21st.dev blocks, a refined warm-charcoal palette with fluid type, two new pages (Science, Product detail), and a contributor doc — per `docs/superpowers/specs/2026-05-10-charvo-filter-redesign.md`.

**Architecture:** Tailwind v4 tokens in `app/globals.css` only; shadcn primitives in `components/ui/*` (CLI-owned); composed components in `components/*` (project-owned); pages in `app/*` consuming both layers. Two 21st.dev blocks imported and adapted to project tokens. No backend changes; mocked product detail added to `lib/api.ts`.

**Tech Stack:** Next.js 16.2.6 · React 19.2.4 · Tailwind 4 · TypeScript 5 · shadcn/ui (with `@tailwindcss/postcss`) · lucide-react · react-hook-form · zod · @hookform/resolvers · sonner · tw-animate-css.

---

## Pre-flight notes for the executing engineer

- **Project root for all paths below:** `C:/Users/Acer/Desktop/Serverless-Computing/charvo-filter` (use forward slashes; Windows accepts them in PowerShell).
- **Package manager:** `npm` only (`package-lock.json` present). Do not switch to pnpm/yarn/bun.
- **`AGENTS.md` directive:** before writing Next-specific code, skim `node_modules/next/dist/docs/` for any topic you are uncertain about — Next 16 has breaking changes from training-data Next.js (e.g. cascading-render rule on `setState` inside `useEffect`).
- **Browser-state precedent:** `components/SiteHeader.tsx` already migrated to `useSyncExternalStore` against `localStorage` via helpers in `lib/auth.ts`. Use the same pattern for any new browser-state code; do not introduce `useEffect` + `useState` synchronisation.
- **Spec source of truth:** `docs/superpowers/specs/2026-05-10-charvo-filter-redesign.md`. If a task's intent is unclear, defer to the spec.
- **Verification cadence:** every task ends with `npx tsc --noEmit` and a commit. Pages tasks add a manual browser walk.
- **No automated UI tests in scope this round** (per spec). The "test" step in TDD becomes: typecheck + lint + visual verification in dev server.

## File structure produced by this plan

```
charvo-filter/
├── app/
│   ├── globals.css                    # MODIFIED — refined tokens
│   ├── layout.tsx                     # MODIFIED — add <Toaster />
│   ├── page.tsx                       # REWRITTEN — hero (21st.dev) + Card features + Accordion FAQ
│   ├── login/page.tsx                 # REWRITTEN — shadcn Form + RHF + zod
│   ├── register/page.tsx              # REWRITTEN — shadcn Form + RHF + zod
│   ├── orders/page.tsx                # REWRITTEN — Card list + Badge + empty state
│   ├── products/
│   │   ├── page.tsx                   # REWRITTEN — product grid (21st.dev)
│   │   └── [slug]/page.tsx            # NEW — product detail with Tabs
│   └── science/
│       └── page.tsx                   # NEW — long-form science explainer
├── components/
│   ├── Button.tsx                     # DELETED
│   ├── Input.tsx                      # DELETED
│   ├── SiteHeader.tsx                 # UNCHANGED (already fixed)
│   ├── SiteFooter.tsx                 # MODIFIED — restyle with new tokens
│   ├── FAQAccordion.tsx               # NEW — wraps shadcn Accordion
│   ├── ScienceDiagram.tsx             # NEW — inline SVG of activated-carbon adsorption
│   └── ui/                            # NEW — shadcn-owned primitives
│       ├── accordion.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       └── tabs.tsx
├── lib/
│   ├── auth.ts                        # UNCHANGED (already migrated)
│   ├── api.ts                         # MODIFIED — add getProduct(slug)
│   └── utils.ts                       # NEW — created by shadcn init
├── docs/
│   ├── frontend-update.md             # NEW — contributor guide
│   └── superpowers/
│       ├── specs/2026-05-10-charvo-filter-redesign.md
│       └── plans/2026-05-10-charvo-filter-redesign.md
├── components.json                    # NEW — shadcn config
├── package.json                       # MODIFIED — new deps
└── tsconfig.json                      # MODIFIED by shadcn init — verify @/* alias
```

---

### Task 0: Prep workspace

**Files:**
- Read: `package.json`, `tsconfig.json`, `app/globals.css`, `app/layout.tsx`
- Init: git in `charvo-filter/` (if not present)

- [ ] **Step 1: Verify cwd and Node toolchain**

```powershell
node --version    # expect >= 20
npm --version
cat package.json
```

Confirm dependencies match spec (next 16.2.6, react 19.2.4, tailwindcss 4).

- [ ] **Step 2: Initialize git in `charvo-filter/` if missing**

```powershell
git rev-parse --is-inside-work-tree
```

If the command errors with "not a git repository", run:

```powershell
git init
git add -A
git commit -m "chore: baseline before redesign"
```

If it succeeds, ensure the working tree is clean before proceeding (`git status` reports nothing).

- [ ] **Step 3: Read the spec end-to-end**

Open `docs/superpowers/specs/2026-05-10-charvo-filter-redesign.md`. Hold the token table, page treatments, and component install plan in mind throughout.

- [ ] **Step 4: Skim Next 16 docs for the topics you'll touch**

```powershell
ls node_modules/next/dist/docs
```

Read at minimum: app-router, dynamic-routes, server-components, not-found, metadata. AGENTS.md mandates this — do not skip.

- [ ] **Step 5: Snapshot current globals.css to a side file**

You will need to merge refined tokens *after* shadcn init clobbers `app/globals.css` in Task 1.

```powershell
cp app/globals.css app/globals.before-shadcn.css.bak
git add app/globals.before-shadcn.css.bak
git commit -m "chore: snapshot globals.css pre-shadcn"
```

(File will be deleted in Task 1 Step 4.)

---

### Task 1: shadcn init + refined tokens

**Files:**
- Modify: `app/globals.css` (replace contents twice — first via shadcn init, then with refined tokens)
- Create (by CLI): `components.json`, `lib/utils.ts`
- Modify (by CLI): `tsconfig.json`, `package.json`
- Delete: `app/globals.before-shadcn.css.bak`

- [ ] **Step 1: Run shadcn init**

```powershell
npx shadcn@latest init
```

Answer prompts:
- Style: **Default**
- Base color: **Zinc**
- CSS variables: **Yes**
- React Server Components: **Yes**
- Components alias: `@/components` (accept default)
- Utils alias: `@/lib/utils` (accept default)
- Tailwind config: detected automatically (Tailwind v4 — no JS config file written)
- Use `--force` only if the CLI complains about an existing project — never bypass other prompts.

Verify after: `components.json` exists, `lib/utils.ts` exists exporting `cn`, and `tsconfig.json` has `@/*` paths. `app/globals.css` has been overwritten by shadcn defaults.

- [ ] **Step 2: Verify install**

```powershell
npx tsc --noEmit
```

Expected: passes (warnings about unused tokens are fine, but no errors).

- [ ] **Step 3: Replace `app/globals.css` with the refined CharcoalX tokens**

Overwrite `app/globals.css` with exactly:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  /* surfaces */
  --background:        #0b0b0d;
  --surface-1:         #141417;
  --surface-2:         #1c1c20;
  --surface-3:         #26262b;
  --border:            #2e2e34;
  --border-strong:     #3a3a42;

  /* foreground */
  --foreground:        #f4f4f5;
  --muted:             #a1a1aa;
  --subtle:            #71717a;

  /* accent */
  --accent:            #c08552;
  --accent-strong:     #d49a6a;
  --accent-foreground: #1a1208;
  --ring:              #d49a6a;

  /* status */
  --danger:  #f87171;
  --success: #4ade80;

  /* radii */
  --radius:    0.5rem;
  --radius-lg: 0.75rem;

  /* fluid type */
  --text-xs:   clamp(0.75rem, 0.72rem + 0.15vw, 0.81rem);
  --text-sm:   clamp(0.875rem, 0.84rem + 0.18vw, 0.95rem);
  --text-base: clamp(1rem,    0.96rem + 0.2vw,  1.075rem);
  --text-lg:   clamp(1.125rem, 1.07rem + 0.27vw, 1.25rem);
  --text-xl:   clamp(1.25rem,  1.18rem + 0.36vw, 1.4rem);
  --text-2xl:  clamp(1.5rem,   1.4rem + 0.5vw,   1.75rem);
  --text-3xl:  clamp(1.875rem, 1.7rem + 0.88vw,  2.5rem);
  --text-4xl:  clamp(2.25rem,  2rem + 1.25vw,    3.25rem);
  --text-5xl:  clamp(2.75rem,  2.4rem + 1.75vw,  4rem);
}

@theme inline {
  --color-background:        var(--background);
  --color-foreground:        var(--foreground);
  --color-surface:           var(--surface-1);
  --color-surface-2:         var(--surface-2);
  --color-surface-3:         var(--surface-3);
  --color-border:            var(--border);
  --color-border-strong:     var(--border-strong);
  --color-muted:             var(--muted);
  --color-subtle:            var(--subtle);
  --color-accent:            var(--accent);
  --color-accent-strong:     var(--accent-strong);
  --color-accent-foreground: var(--accent-foreground);
  --color-ring:              var(--ring);
  --color-danger:            var(--danger);
  --color-success:           var(--success);
  --font-sans:               var(--font-geist-sans);
  --font-mono:               var(--font-geist-mono);
  --radius:                  var(--radius);
}

html, body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}

::selection {
  background: var(--accent);
  color: var(--accent-foreground);
}
```

Delete the snapshot:

```powershell
rm app/globals.before-shadcn.css.bak
```

- [ ] **Step 4: Verify and commit**

```powershell
npx tsc --noEmit
```

Expected: passes.

```powershell
git add components.json lib/utils.ts tsconfig.json package.json package-lock.json app/globals.css
git rm app/globals.before-shadcn.css.bak
git commit -m "feat: shadcn init with CharcoalX design tokens"
```

---

### Task 2: Install runtime deps + add shadcn primitives

**Files:**
- Modify (by CLI): `package.json`, `package-lock.json`
- Create (by CLI): `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/label.tsx`, `components/ui/card.tsx`, `components/ui/sheet.tsx`, `components/ui/tabs.tsx`, `components/ui/accordion.tsx`, `components/ui/badge.tsx`, `components/ui/skeleton.tsx`, `components/ui/separator.tsx`, `components/ui/sonner.tsx`, `components/ui/form.tsx`

- [ ] **Step 1: Install icon + form runtime deps**

```powershell
npm install lucide-react react-hook-form zod @hookform/resolvers sonner tw-animate-css
```

Expected: installs without peer-dep errors. `tw-animate-css` was already added by shadcn init in some templates; if `npm install` says it's already present, that's fine.

- [ ] **Step 2: Add shadcn primitives**

```powershell
npx shadcn@latest add button input label card sheet tabs accordion badge skeleton separator sonner form
```

Accept any overwrite prompts that affect `components/ui/*` only. Decline overwrites of `app/globals.css` if asked (we just set it).

- [ ] **Step 3: Verify**

```powershell
npx tsc --noEmit
```

Expected: passes. If `form.tsx` errors about `react-hook-form` types, ensure Step 1 installed it.

- [ ] **Step 4: Commit**

```powershell
git add package.json package-lock.json components/ui/
git commit -m "feat: install shadcn primitives and form/icon deps"
```

---

### Task 3: Wire Toaster, restyle SiteFooter, retire old Button/Input

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/SiteFooter.tsx`
- Delete: `components/Button.tsx`, `components/Input.tsx`
- Audit & rewrite: any callers of the deleted components

- [ ] **Step 1: Identify callers of `Button.tsx` and `Input.tsx`**

```powershell
# Use the Grep tool, not raw rg, when running inside Claude Code
```

Search for `from "../components/Button"`, `from "../../components/Button"`, `from "@/components/Button"`, and same for `Input`. Record every call site.

- [ ] **Step 2: Add `<Toaster />` to root layout**

Edit `app/layout.tsx`. After the existing imports add:

```tsx
import { Toaster } from "../components/ui/sonner";
```

In the body, immediately before `</body>`'s implicit close (i.e. after `<SiteFooter />`), add:

```tsx
        <Toaster richColors position="top-right" />
```

The full body becomes:

```tsx
      <body className="min-h-full flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster richColors position="top-right" />
      </body>
```

- [ ] **Step 3: Restyle `components/SiteFooter.tsx` to current tokens**

Replace its contents with:

```tsx
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
```

- [ ] **Step 4: Migrate every `Button` / `Input` import to shadcn UI**

For each call site found in Step 1, change the import and adjust the JSX to the shadcn API.

Old (project component):
```tsx
import { Button } from "../components/Button";
<Button variant="primary">Submit</Button>
```

New (shadcn):
```tsx
import { Button } from "../components/ui/button";
<Button variant="default">Submit</Button>
```

shadcn `Button` variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`. shadcn `Input` accepts standard input props plus `className`. If the old component had a `loading` prop, replace with:

```tsx
<Button disabled={isSubmitting}>
  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  Submit
</Button>
```

(Imports for `Loader2` come from `lucide-react`.)

- [ ] **Step 5: Delete the old components**

```powershell
git rm components/Button.tsx components/Input.tsx
```

- [ ] **Step 6: Verify**

```powershell
npx tsc --noEmit
npm run lint
```

Expected: both pass with no errors. If lint warns about unused imports anywhere, clean them up.

- [ ] **Step 7: Commit**

```powershell
git add app/layout.tsx components/SiteFooter.tsx
# also stage any caller files modified in Step 4
git commit -m "feat: wire sonner toaster, restyle footer, retire legacy Button/Input"
```

---

### Task 4: Build `FAQAccordion` and rebuild home page

**Files:**
- Create: `components/FAQAccordion.tsx`
- Rewrite: `app/page.tsx`
- Import (via `mcp__21st-magic`): a hero block component into `app/page.tsx` (inline) or a sibling file `components/HeroBlock.tsx`

- [ ] **Step 1: Create `components/FAQAccordion.tsx`**

```tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export type FAQ = { q: string; a: string };

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-[color:var(--border)]">
          <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-[color:var(--muted)] leading-relaxed">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

- [ ] **Step 2: Pick a hero block from 21st.dev**

Use the magic tools. Open ToolSearch and select `mcp__21st-magic__21st_magic_component_inspiration`, then call it with:

```
{ "searchQuery": "centered hero dark theme product launch with dual CTA and eyebrow chip", "message": "Looking for a centered hero section for an e-commerce harm-reduction filter brand. Dark surface, warm amber accent, eyebrow chip + headline + sub + two CTAs (primary 'Shop filters', secondary 'Sign in'). Optional right-column illustration." }
```

Pick one preview that fits. If nothing fits cleanly, fall back to the existing hand-built hero (current `app/page.tsx`) and skip Step 3 — note the fallback in `frontend-update.md` later.

- [ ] **Step 3: Generate the hero into `components/HeroBlock.tsx`**

Use `mcp__21st-magic__21st_magic_component_builder` with the chosen `previewKey`, target `components/HeroBlock.tsx`, and instruct: "Use only Tailwind classes referencing CSS variables defined in `app/globals.css` (`--background`, `--surface-1`, `--surface-2`, `--border`, `--accent`, `--accent-strong`, `--accent-foreground`, `--muted`, `--foreground`). Headline copy: 'Smoke smarter.' / accent line 'Filter the harsh stuff.' Subcopy: 'Slim 6 mm activated charcoal filter tips that adsorb tar and particulate before it hits your throat. Fits American Spirit and hand-rolled tobacco.' Eyebrow chip text: 'Harm reduction. Not a health claim.' Primary CTA: 'Shop filters' linking to `/products`. Secondary CTA: 'Sign in' linking to `/login`. Export named `HeroBlock`."

After generation, manually verify the file uses no hex colors — only `[color:var(--…)]`. If any hex remains, edit it out.

- [ ] **Step 4: Rewrite `app/page.tsx`**

Replace contents with:

```tsx
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
```

If you fell back to the hand-built hero in Step 2, replace `<HeroBlock />` with the original hero JSX from the prior `app/page.tsx`.

- [ ] **Step 5: Verify in dev server**

```powershell
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Hero renders with correct colors and CTAs.
- Features render as 3 cards.
- FAQ accordion expands/collapses.
- No console errors. No hydration warnings.

Stop the dev server (Ctrl+C).

- [ ] **Step 6: Verify build + commit**

```powershell
npx tsc --noEmit
npm run lint
git add app/page.tsx components/FAQAccordion.tsx components/HeroBlock.tsx
git commit -m "feat: home page with imported hero, Card features, Accordion FAQ"
```

---

### Task 5: Rebuild products listing with imported product-grid block

**Files:**
- Read: `lib/api.ts` (understand `Product` type and `getProducts` shape)
- Rewrite: `app/products/page.tsx`
- Possibly create: `components/ProductGrid.tsx` (if the 21st.dev block is exported separately)

- [ ] **Step 1: Read `lib/api.ts`**

Note the `Product` type, the function name to fetch the product list, and `formatPrice`. The rewrite must use the existing API surface.

- [ ] **Step 2: Pick a product-grid block from 21st.dev**

Call `mcp__21st-magic__21st_magic_component_inspiration`:

```
{ "searchQuery": "ecommerce product card grid 3 columns dark with image price and CTA button", "message": "Need a 3-up product grid for a cigarette-filter shop. Each card: tinted SVG/image area on top, product title, price, 'View' CTA linking to product detail. Dark surface, warm amber accent." }
```

If nothing fits, hand-compose the grid using shadcn `Card` + `Badge` and skip Step 3.

- [ ] **Step 3: Generate the grid into `components/ProductGrid.tsx`**

Use `mcp__21st-magic__21st_magic_component_builder` targeting `components/ProductGrid.tsx`. Instruct: "Export named `ProductGrid({ products })`. `products` is an array of `{ slug: string; name: string; priceCents: number; blurb: string }`. Render a responsive 3-column grid (1 col mobile, 2 sm, 3 lg). Each card uses the existing CSS variables (`--surface-1`, `--border`, `--accent`, `--foreground`, `--muted`). Image area is a tinted SVG placeholder (a circle + filter shape on `--surface-2`). Price formatted via the prop's `priceCents` divided by 100, prefixed with `$`. Card is wrapped in `<Link href={`/products/${slug}`}>`."

After generation, audit for hex colors and rewrite to CSS variable references.

- [ ] **Step 4: Rewrite `app/products/page.tsx`**

Open the existing file first to see how `getProducts` is currently called and adapt. Then replace its content with (adapt names to match `lib/api.ts`):

```tsx
import { getProducts } from "../../lib/api";
import { ProductGrid } from "../../components/ProductGrid";

export default async function ProductsPage() {
  const products = await getProducts();

  if (!products?.length) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">No filters available</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Check back soon — our line is being restocked.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Filters</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
          Slim 6 mm activated-charcoal tips. Pick a pack size that matches your habit.
        </p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
```

If `getProducts` is a client-side call (uses `fetch` to the FastAPI backend), keep this page as `"use client"` and use `useEffect` only to *initiate* the fetch — store the result via `useState`, with a Skeleton state during loading. (This is fine — the cascading-render rule forbids `setState` inside `useEffect` *body* synchronously, but `setState` inside the `then()` of a Promise or inside an `async` function awaited in the effect is allowed.)

For the loading state use:

```tsx
import { Skeleton } from "../../components/ui/skeleton";

// while loading:
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {Array.from({ length: 6 }).map((_, i) => (
    <Skeleton key={i} className="h-64 w-full bg-[color:var(--surface-2)]" />
  ))}
</div>
```

- [ ] **Step 5: Verify in dev server**

```powershell
npm run dev
```

Open `http://localhost:3000/products`. Confirm:
- Products render in a responsive grid (resize the window).
- Each card links to `/products/<slug>`.
- Empty state shows when the API returns no products (test by stopping the backend if applicable).
- No console errors.

Stop the dev server.

- [ ] **Step 6: Verify build + commit**

```powershell
npx tsc --noEmit
npm run lint
git add app/products/page.tsx components/ProductGrid.tsx
git commit -m "feat: products listing with imported 21st.dev grid block"
```

---

### Task 6: Add `getProduct(slug)` to `lib/api.ts` and build product detail page

**Files:**
- Modify: `lib/api.ts` — add `getProduct(slug: string)`
- Create: `app/products/[slug]/page.tsx`

- [ ] **Step 1: Add `getProduct` to `lib/api.ts`**

Open `lib/api.ts`. After the existing `getProducts` export, add:

```ts
export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
```

If the `Product` type does not have a `slug` field, add `slug: string` to the type and ensure the mock list provides it. (If your `getProducts` returns from a backend, the backend must already serialize a `slug`; if not, fall back to `String(p.id)` for now and note the limitation in `frontend-update.md`.)

- [ ] **Step 2: Create `app/products/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";

import { getProduct, formatPrice } from "../../../lib/api";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/products"
        className="text-xs text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
      >
        ← Back to filters
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <Card className="bg-[color:var(--surface-1)] border-[color:var(--border)]">
          <CardContent className="flex aspect-square items-center justify-center p-10">
            <svg viewBox="0 0 320 320" className="w-full max-w-xs text-[color:var(--accent)]" fill="none" aria-hidden>
              <circle cx="160" cy="160" r="120" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
              <circle cx="160" cy="160" r="80" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
              <rect x="120" y="60" width="80" height="200" rx="40" stroke="currentColor" strokeWidth="2" fill="var(--surface-2)" />
              <rect x="120" y="60" width="80" height="50" rx="40" fill="currentColor" fillOpacity="0.85" />
            </svg>
          </CardContent>
        </Card>

        {/* Spec */}
        <div>
          <Badge className="bg-[color:var(--surface-2)] text-[color:var(--accent)] border border-[color:var(--accent)]/30 hover:bg-[color:var(--surface-2)]">
            6 mm activated charcoal
          </Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-2xl text-[color:var(--accent)] font-mono">
            {formatPrice(product.priceCents)}
          </p>
          <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
            {product.blurb}
          </p>

          <Button className="mt-6 bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent-strong)]">
            Add to cart
          </Button>

          <Tabs defaultValue="overview" className="mt-10">
            <TabsList className="bg-[color:var(--surface-2)]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="spec">Spec</TabsTrigger>
              <TabsTrigger value="honest">Honest answers</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-sm text-[color:var(--muted)] leading-relaxed pt-4">
              {product.blurb}
            </TabsContent>
            <TabsContent value="spec" className="text-sm text-[color:var(--muted)] pt-4">
              <ul className="space-y-2">
                <li>Diameter: 6 mm</li>
                <li>Length: 27 mm</li>
                <li>Carbon source: coconut shell</li>
                <li>Single use</li>
              </ul>
            </TabsContent>
            <TabsContent value="honest" className="text-sm text-[color:var(--muted)] leading-relaxed pt-4">
              CharcoalX is a harm-reduction product. It does not make smoking safe. If quitting is on the table, prefer that.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify in dev server**

```powershell
npm run dev
```

Open `http://localhost:3000/products`, click into a product. Confirm:
- Gallery + spec render side-by-side on desktop, stacked on mobile.
- Tabs switch correctly.
- `http://localhost:3000/products/does-not-exist` returns Next 16 not-found page.

Stop the dev server.

- [ ] **Step 4: Verify build + commit**

```powershell
npx tsc --noEmit
npm run lint
git add lib/api.ts app/products/[slug]/page.tsx
git commit -m "feat: product detail page with Tabs spec view"
```

---

### Task 7: Build Science page + ScienceDiagram component

**Files:**
- Create: `components/ScienceDiagram.tsx`
- Create: `app/science/page.tsx`

- [ ] **Step 1: Create `components/ScienceDiagram.tsx`**

```tsx
export function ScienceDiagram() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full max-w-xl text-[color:var(--accent)]"
      fill="none"
      aria-label="Activated carbon adsorbs tar and particulate as smoke passes through"
    >
      {/* tube */}
      <rect x="40" y="80" width="320" height="40" rx="20" stroke="currentColor" strokeWidth="2" fill="var(--surface-2)" />
      {/* carbon granules */}
      {Array.from({ length: 30 }).map((_, i) => (
        <circle
          key={i}
          cx={60 + (i * 9)}
          cy={100}
          r={3 + (i % 3)}
          fill="currentColor"
          fillOpacity={0.4 + (i % 4) * 0.15}
        />
      ))}
      {/* arrow in */}
      <path d="M 10 100 L 40 100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="10" y="80" fill="var(--muted)" fontSize="11">smoke in</text>
      {/* arrow out */}
      <path d="M 360 100 L 390 100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="340" y="140" fill="var(--muted)" fontSize="11">cleaner draw</text>
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
        </marker>
      </defs>
    </svg>
  );
}
```

- [ ] **Step 2: Create `app/science/page.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify in dev server**

```powershell
npm run dev
```

Open `http://localhost:3000/science`. Confirm:
- Header, diagram, and three content blocks render.
- Diagram SVG fills its container.
- The "what it does not do" card uses the danger-tinted border.
- No console errors.

Stop the dev server.

- [ ] **Step 4: Verify build + commit**

```powershell
npx tsc --noEmit
npm run lint
git add components/ScienceDiagram.tsx app/science/page.tsx
git commit -m "feat: add /science page with adsorption diagram"
```

---

### Task 8: Rebuild orders page

**Files:**
- Read: `lib/api.ts` (understand the `Order` type and `getOrders` function)
- Rewrite: `app/orders/page.tsx`

- [ ] **Step 1: Read existing `app/orders/page.tsx` and `lib/api.ts`**

Note the `Order` shape — fields like `id`, `createdAt`, `total`, `status`, `items`. Also note whether `getOrders` is server- or client-side.

- [ ] **Step 2: Rewrite `app/orders/page.tsx`**

Use this template, adapting field names to match `lib/api.ts`:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { getOrders, formatPrice } from "../../lib/api";
import type { Order } from "../../lib/api";

const statusVariant: Record<string, string> = {
  pending: "bg-[color:var(--surface-2)] text-[color:var(--muted)]",
  paid: "bg-[color:var(--success)]/15 text-[color:var(--success)] border border-[color:var(--success)]/30",
  shipped: "bg-[color:var(--accent)]/15 text-[color:var(--accent)] border border-[color:var(--accent)]/30",
  cancelled: "bg-[color:var(--danger)]/15 text-[color:var(--danger)] border border-[color:var(--danger)]/30",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getOrders()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch(() => {
        if (!cancelled) setOrders([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (orders === null) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full bg-[color:var(--surface-2)]" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">No orders yet</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          When you place your first order it will show up here.
        </p>
        <Button asChild className="mt-6 bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent-strong)]">
          <Link href="/products">Shop filters</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Your orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-[color:var(--surface-1)] border-[color:var(--border)]">
            <CardHeader className="flex-row justify-between items-center">
              <CardTitle className="text-base">Order #{order.id}</CardTitle>
              <Badge className={statusVariant[order.status] ?? statusVariant.pending}>
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="text-sm text-[color:var(--muted)] flex justify-between">
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              <span className="font-mono text-[color:var(--foreground)]">
                {formatPrice(order.total)}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

If the existing `Order` type uses different field names (e.g. `created_at` instead of `createdAt`, or `total_cents` instead of `total`), adapt the JSX — do **not** modify the type unless the spec calls for it.

- [ ] **Step 3: Verify in dev server**

```powershell
npm run dev
```

Sign in (use existing register/login flow), navigate to `/orders`. Confirm:
- Skeleton flashes during load.
- Empty state renders for new accounts.
- Cards render with correctly-coloured status badges.

Stop the dev server.

- [ ] **Step 4: Verify build + commit**

```powershell
npx tsc --noEmit
npm run lint
git add app/orders/page.tsx
git commit -m "feat: orders page with Card list, status badges, empty state"
```

---

### Task 9: Rebuild login + register with shadcn Form, RHF, zod, Sonner

**Files:**
- Read: `lib/api.ts` for the auth functions used by current login/register pages
- Rewrite: `app/login/page.tsx`
- Rewrite: `app/register/page.tsx`

- [ ] **Step 1: Read existing pages to identify the auth API**

Note function names (likely `login(email, password)` and `register(email, password)`), what they return, and how they trigger `saveSession`.

- [ ] **Step 2: Rewrite `app/login/page.tsx`**

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { login } from "../../lib/api";
import { saveSession } from "../../lib/auth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: Values) => {
    setSubmitting(true);
    try {
      const { token, user } = await login(values.email, values.password);
      saveSession(token, user);
      toast.success("Signed in");
      router.push("/orders");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        Welcome back.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent-strong)]"
          >
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-sm text-[color:var(--muted)]">
        Need an account?{" "}
        <Link href="/register" className="text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]">
          Register
        </Link>
      </p>
    </div>
  );
}
```

If the current `login` function in `lib/api.ts` returns a different shape (e.g. `{ access_token, user }`), adapt the destructuring — keep `saveSession(token, user)` semantically equivalent.

- [ ] **Step 3: Rewrite `app/register/page.tsx`**

Mirror the login page with these differences: zod schema adds `name` field; submit calls `register(name, email, password)`; success toast says "Account created"; redirect to `/orders`.

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { register as registerApi } from "../../lib/api";
import { saveSession } from "../../lib/auth";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

type Values = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: Values) => {
    setSubmitting(true);
    try {
      const { token, user } = await registerApi(values.name, values.email, values.password);
      saveSession(token, user);
      toast.success("Account created");
      router.push("/orders");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        Track orders and reorder fast.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent-strong)]"
          >
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-sm text-[color:var(--muted)]">
        Already have one?{" "}
        <Link href="/login" className="text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]">
          Sign in
        </Link>
      </p>
    </div>
  );
}
```

Adapt `registerApi(name, email, password)` to the actual signature in `lib/api.ts`.

- [ ] **Step 4: Verify in dev server**

```powershell
npm run dev
```

Walk through:
- `/register` — submit empty form → see inline zod errors. Submit valid form → toast success → redirect to `/orders`.
- `/login` — submit invalid → toast error. Submit valid → success → redirect.
- After login, `SiteHeader` re-renders to show `Orders` + `Logout`. After logout, header reverts. **No cascading-render warnings in the console** (this is the Next 16 rule we are explicitly checking).

Stop the dev server.

- [ ] **Step 5: Verify build + commit**

```powershell
npx tsc --noEmit
npm run lint
git add app/login/page.tsx app/register/page.tsx
git commit -m "feat: login + register with RHF/zod/Sonner"
```

---

### Task 10: Final verification + write `frontend-update.md`

**Files:**
- Create: `docs/frontend-update.md`

- [ ] **Step 1: Full verification pass**

```powershell
npx tsc --noEmit
npm run lint
npm run build
```

All three must pass. Fix any errors — do not proceed with warnings about hydration mismatch or cascading renders.

- [ ] **Step 2: Manual page walk**

Start dev server. Visit each in turn and tick off:

- [ ] `/` — hero, features, FAQ all render; CTAs link correctly
- [ ] `/products` — grid renders, links to detail
- [ ] `/products/<valid-slug>` — detail page renders, tabs work
- [ ] `/products/does-not-exist` — Next 16 not-found page
- [ ] `/science` — long-form + diagram render
- [ ] `/orders` (logged out) — should redirect or show appropriate state per `lib/api.ts`
- [ ] `/orders` (logged in, empty) — empty state with CTA
- [ ] `/login` — form validation + success toast + redirect
- [ ] `/register` — same checks
- [ ] `SiteHeader` — auth state syncs across tabs (open two tabs, log out in one, the other updates)
- [ ] `prefers-reduced-motion` honoured (DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`; accordions and tabs should not animate)

Note any failures and fix before continuing.

- [ ] **Step 3: Write `docs/frontend-update.md`**

```markdown
# CharcoalX Frontend — contributor guide

_Last updated: 2026-05-10. Spec: `docs/superpowers/specs/2026-05-10-charvo-filter-redesign.md`._

## What changed

This pass migrated the storefront from a hand-rolled component layer to shadcn/ui primitives, refined the design tokens, added two pages (`/products/[slug]`, `/science`), and imported two 21st.dev blocks (hero on `/`, product grid on `/products`).

## Tokens

All colour, radius, and type tokens live in `app/globals.css` under `:root` and are exposed to Tailwind via `@theme inline`. Consume them in JSX as `[color:var(--token)]` (Tailwind v4 arbitrary-value syntax).

| Token | Use |
|---|---|
| `--background` | Body and section backgrounds |
| `--surface-1` | Cards, header/footer surfaces |
| `--surface-2` | Inputs, badges, hover states |
| `--surface-3` | Pressed/active surfaces |
| `--border` | Default divider |
| `--border-strong` | Emphasised divider |
| `--foreground` | Body text |
| `--muted` | Secondary text |
| `--subtle` | Tertiary / metadata text |
| `--accent` | Brand amber, primary CTAs |
| `--accent-strong` | Hover state of accent |
| `--accent-foreground` | Text on accent surfaces |
| `--ring` | Focus ring |
| `--danger`, `--success` | Status colours |

Contrast: body text on `--background` ≥ 4.5:1. Accent on `--background` is reserved for ≥ 18 px (or ≥ 14 px bold).

Type uses fluid `clamp()` scales (`--text-xs` … `--text-5xl`). Headings should reach for `--text-3xl` and up; body text uses `--text-base`.

## Component inventory

**Primitives** (CLI-owned, in `components/ui/`):
`button`, `input`, `label`, `card`, `sheet`, `tabs`, `accordion`, `badge`, `skeleton`, `separator`, `sonner`, `form`. Source: https://ui.shadcn.com.

**Project components**:
- `SiteHeader.tsx` — auth-aware nav, uses `useSyncExternalStore`.
- `SiteFooter.tsx` — three-column footer.
- `FAQAccordion.tsx` — wraps shadcn `Accordion` with brand defaults.
- `ScienceDiagram.tsx` — inline SVG of activated-carbon adsorption.
- `HeroBlock.tsx` — imported 21st.dev hero, adapted to project tokens. _Source URL recorded inline at the top of the file._
- `ProductGrid.tsx` — imported 21st.dev grid block, adapted. _Source URL recorded inline._

## Adding a new shadcn component

```powershell
npx shadcn@latest add <component-name>
```

Lands in `components/ui/<component-name>.tsx`. Do not hand-edit primitives except to swap colour classes for project CSS variables.

## Swapping a 21st.dev block

The block files are `components/HeroBlock.tsx` and `components/ProductGrid.tsx`. Each is one self-contained file. To swap:

1. Run `mcp__21st-magic__21st_magic_component_inspiration` for new candidates.
2. Replace the file contents with the generated code.
3. Audit for hex colours; replace with `[color:var(--…)]` references.
4. Update the source URL comment at the top of the file.

If neither block is in use because nothing fit, see git history for the hand-composed fallback.

## Conventions

- **Browser state**: read with `useSyncExternalStore`, never `useEffect` + `useState` synchronisation. See `components/SiteHeader.tsx` for the canonical pattern.
- **No hex outside `app/globals.css`**: every colour in TSX must be a `--token`.
- **Forms**: react-hook-form + zod + shadcn `Form`. Errors render via `<FormMessage />`; user-facing toasts via Sonner.
- **Loading states**: `Skeleton` placeholders, not spinners, for content blocks.
- **Icons**: `lucide-react` only.
- **Next 16 docs**: when uncertain, read `node_modules/next/dist/docs/` (per `AGENTS.md`).

## Known limitations

- Mocked product data (no CMS).
- No cart / checkout / About page yet.
- No light mode.
- No real product photography.
- `/orders/[id]` per-order detail not yet built.
- No automated UI tests.

## Versions installed

(record current versions of: `next`, `react`, `tailwindcss`, `@radix-ui/*` via `npm ls`, `lucide-react`, `react-hook-form`, `zod`, `sonner`, `tw-animate-css`. Run `npm ls --depth=0` and paste output here.)
```

Replace the parenthetical at the bottom with actual `npm ls --depth=0` output before committing.

- [ ] **Step 4: Final commit**

```powershell
git add docs/frontend-update.md
git commit -m "docs: contributor guide for the redesigned frontend"
```

- [ ] **Step 5: Summarise the branch state**

```powershell
git log --oneline
git status
```

Confirm the working tree is clean and the commit history reads as a coherent narrative of the redesign.

---

## Self-review (executed against the spec)

- **Tokens** (`spec §Design tokens`): Task 1 ✓
- **Component install plan** (`spec §Component install plan` 1–6): Tasks 1, 2, 3 ✓
- **21st.dev block selection** (`spec §21st.dev block selection`): Tasks 4 (hero), 5 (grid) ✓ with hand-composed fallbacks documented
- **Pages — Home** (`spec §Page treatments`): Task 4 ✓
- **Pages — Products** (`spec §Page treatments`): Task 5 ✓
- **Pages — Product detail** (new, `spec §Architecture`): Task 6 ✓
- **Pages — Science** (new, `spec §Architecture`): Task 7 ✓
- **Pages — Orders** (`spec §Page treatments`): Task 8 ✓
- **Pages — Login + Register** (`spec §Page treatments`): Task 9 ✓
- **Data flow — `getProduct(slug)` added to `lib/api.ts`** (`spec §Data flow`): Task 6 ✓
- **Error handling — `notFound()` on missing slug, toast for auth errors** (`spec §Error handling`): Tasks 6, 9 ✓
- **Testing — manual checklist** (`spec §Testing`): Task 10 ✓
- **Frontend update doc** (`spec §Frontend update doc`): Task 10 ✓
- **Browser-state convention preserved**: Tasks 5, 8 use `useEffect` only to start a Promise (allowed) and SiteHeader continues to use `useSyncExternalStore` (untouched)

No spec section is unaddressed.
