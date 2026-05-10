# CharcoalX Frontend — contributor guide

_Last updated: 2026-05-10. Spec: `docs/superpowers/specs/2026-05-10-charvo-filter-redesign.md`. Plan: `docs/superpowers/plans/2026-05-10-charvo-filter-redesign.md`._

## What this is

A light, paper-toned editorial storefront for CharcoalX (harm-reduction cigarette filters). Designed to feel closer to an editorial magazine than to a generic ecommerce template — typography-first, hairlines instead of borders, generous whitespace, single accent used sparingly.

The earlier dark warm-charcoal version was rebuilt in this pass into the editorial system documented below. Aesthetic reference: betteroff.studio.

## Design principles

1. **Typography is the design.** Massive display headlines (`var(--text-display)`, up to ~7.5rem). Italic serif accent words inside sans headlines via `<Display>`. Tight tracking on display sizes, leading-0.95 to -0.92.
2. **Hairlines, not borders.** Dividers are 1px at `--border` opacity (~12% of foreground). No drop shadows, almost no border-radius.
3. **Generous vertical rhythm.** Sections run `py-32` (8 rem) on desktop. Asterisk (`<Asterisk />`) renders centered between major sections.
4. **Numbered sections.** Each major area carries a `CX/NN — Label` eyebrow rendered by `<Eyebrow>` or wrapped by `<SectionHeader>`.
5. **Asymmetric grids.** 12-col grids with content offset (e.g. headline `col-span-7`, blurb `col-start-9 col-span-4`).
6. **Single accent, used sparingly.** Forest green (`--accent: #386A20`) appears on numbered markers, italic serif words, focus states, and one CTA per surface. Body text and most links remain near-black.
7. **No card chrome on editorial surfaces.** Forms use bottom-bordered hairline inputs (no shadcn `Form`/`Input`). Product listings are hairline tables, not card grids.

## Tokens

Tokens live in `app/globals.css` under `:root` and are exposed to Tailwind via `@theme inline`. Consume in JSX as `[color:var(--token)]` (Tailwind v4 arbitrary-value syntax).

| Token | Hex / value | Use |
|---|---|---|
| `--background` | `#f6f3ee` | Body — warm paper |
| `--surface-1` | `#ffffff` | Pure-white inset surfaces (rare) |
| `--surface-2` | `#ede8df` | Hover tint, skeleton fill |
| `--surface-3` | `#e2dccf` | Pressed/active surface |
| `--border` | `rgba(14,14,16,0.12)` | Default hairline |
| `--border-strong` | `rgba(14,14,16,0.24)` | Form input underline |
| `--foreground` | `#0e0e10` | Body text |
| `--muted` | `#5b5b5e` | Secondary text |
| `--subtle` | `#8c8c8e` | Tertiary / metadata |
| `--accent` | `#386A20` (forest) | Primary editorial accent — section markers, italic words, default CTA underline |
| `--accent-strong` | `#089038` (vibrant) | Hover / active state of accent |
| `--accent-medium` | `#75AA47` (grass) | Reserved for secondary accents |
| `--accent-light` | `#93CB56` (lime) | Reserved for subtle highlights |
| `--accent-foreground` | `#ffffff` | Text on accent fills |
| `--ring` | `#089038` | Focus ring |
| `--danger` | `#b34238` | Errors |
| `--success` | `#2f7a3a` | Success messages |

Type uses fluid `clamp()` scales: `--text-xs … --text-5xl` plus a hero-only `--text-display` (≈ clamp 3rem to 7.5rem).

Fonts (loaded via `next/font/google` in `app/layout.tsx`):
- **Geist Sans** — body and most headings (`var(--font-sans)`)
- **Geist Mono** — prices, IDs (`var(--font-mono)`)
- **Instrument Serif** — italic accent words inside headlines, decorative numbers (`var(--font-serif)`)

## Editorial primitives

In `components/editorial/`:

- **`SectionHeader`** — numbered section header. Props: `number` (e.g. "01"), `label` (e.g. "Filters"), `title` (ReactNode), optional `blurb`. Renders a 12-col grid with the `CX/NN — LABEL` marker on the left and a large title + blurb on the right.
- **`Asterisk`** — centered `✻` in italic serif accent. Used between major sections.
- **`Eyebrow`** — small-caps tracked label in accent color. Use when you need just the marker without the full SectionHeader grid.
- **`Display`** — inline serif-italic accent span. Wrap accent words inside otherwise-sans headlines: `<h1>Smoke <Display>smarter.</Display></h1>`.

## Component inventory

**shadcn primitives** (in `components/ui/`, mostly used inside the auth/order pages and select moments — most surfaces avoid them in favor of raw editorial JSX):
`accordion`, `badge`, `button`, `card`, `form`, `input`, `label`, `separator`, `sheet`, `skeleton`, `sonner`, `tabs`. Source: https://ui.shadcn.com.

> Note: this version of shadcn ships most primitives on **Base UI** (`@base-ui/react`) rather than Radix. APIs differ slightly. `Button` does not support `asChild` — wrap a `<Link>` in styling classes instead.

**Project components**:
- `SiteHeader.tsx` — minimal editorial nav, auth-aware via `useSyncExternalStore`. Logo: "Charcoal" + italic serif "X" + "®" mark.
- `SiteFooter.tsx` — three-column footer with a large display headline at the left.
- `ProductIndex.tsx` — table-style product listing (replaced the old card grid).
- `ScienceDiagram.tsx` — hairline SVG of activated-carbon adsorption with serif italic labels.
- `editorial/SectionHeader.tsx`, `Asterisk.tsx`, `Eyebrow.tsx`, `Display.tsx` — see above.

## Adding a new shadcn component

```bash
npx shadcn@latest add <component-name> --yes --overwrite
```

Lands in `components/ui/<component-name>.tsx`. Hand-edit only to swap colour classes for project CSS variables.

## Conventions

- **Browser state**: `useSyncExternalStore` for anything that reads `localStorage` or other external mutable state. See `components/SiteHeader.tsx`. `setState` synchronously inside `useEffect` body is forbidden by Next 16; `setState` inside `.then()` of a Promise is allowed (see `app/products/page.tsx`).
- **No hex outside `app/globals.css`**: every colour in TSX uses `[color:var(--token)]`. SVG fills/strokes inside JSX should use `currentColor` and rely on the parent's `text-[color:var(--…)]`.
- **Forms**: prefer hairline-bottom inputs in the editorial style. Auth uses react-hook-form + zod + Sonner toasts. Errors render below each field as small text in `--danger`.
- **Loading states**: `Skeleton` placeholders with `bg-[color:var(--surface-2)] rounded-none` to match the hairline aesthetic.
- **Icons**: `lucide-react` only when truly needed. Most "icons" in this design are typographic (arrows `→`, `✻`, `+`).
- **API surface**: `lib/api.ts` exposes methods on an `api` object (`api.login({ email, password })`, `api.register({ email, password, full_name })`, `api.getMyOrders()`, `api.getProducts()`). Returns include `access_token` (snake_case) — pass to `saveSession(access_token, user)`.
- **Field naming**: API responses use snake_case (`price_cents`, `created_at`, `total_cents`, `image_url`). Render directly without renaming.
- **Next 16 docs**: when uncertain, read `node_modules/next/dist/docs/` (per `AGENTS.md`).

## Known limitations

- Mocked product data via the FastAPI backend; no CMS.
- No cart / checkout / About page yet. The "Add to cart" button on product detail is intentionally disabled.
- Product detail route is `/products/[id]` (uses the product `id` field, not a `slug`).
- No light / dark mode toggle — the design is light-only by intent.
- No real product photography (the design is typography-first; imagery deferred).
- `/orders/[id]` per-order detail not yet built.
- No automated UI tests.

## Versions installed

```
charvo-filter@0.1.0 C:\Users\Acer\Desktop\Serverless-Computing\charvo-filter
├── @base-ui/react@1.4.1
├── @emnapi/core@1.10.0 extraneous
├── @emnapi/runtime@1.10.0 extraneous
├── @emnapi/wasi-threads@1.2.1 extraneous
├── @hookform/resolvers@5.2.2
├── @napi-rs/wasm-runtime@0.2.12 extraneous
├── @radix-ui/react-label@2.1.8
├── @radix-ui/react-slot@1.2.4
├── @tailwindcss/postcss@4.3.0
├── @tybys/wasm-util@0.10.2 extraneous
├── @types/node@20.19.40
├── @types/react-dom@19.2.3
├── @types/react@19.2.14
├── class-variance-authority@0.7.1
├── clsx@2.1.1
├── eslint-config-next@16.2.6
├── eslint@9.39.4
├── lucide-react@1.14.0
├── next-themes@0.4.6
├── next@16.2.6
├── react-dom@19.2.4
├── react-hook-form@7.75.0
├── react@19.2.4
├── shadcn@4.7.0
├── sonner@2.0.7
├── tailwind-merge@3.6.0
├── tailwindcss@4.3.0
├── tw-animate-css@1.4.0
├── typescript@5.9.3
└── zod@4.4.3
```
