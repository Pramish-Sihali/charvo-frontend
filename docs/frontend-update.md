# CharcoalX Frontend — contributor guide

_Last updated: 2026-05-10. Spec: `docs/superpowers/specs/2026-05-10-charvo-filter-redesign.md`. Plan: `docs/superpowers/plans/2026-05-10-charvo-filter-redesign.md`._

## What changed

This pass migrated the storefront from a hand-rolled component layer to shadcn/ui primitives (Base UI under the hood for most), refined the design tokens with fluid `clamp()` typography, added two pages (`/products/[id]`, `/science`), and replaced the FAQ + product card surfaces with composed shadcn primitives (the planned 21st.dev block imports were attempted but the candidates returned by the MCP did not match the project's CSS-variable token system, so hand-built equivalents were used).

The cascading-render error in `SiteHeader` that triggered the redesign was fixed prior to this work — the component now uses `useSyncExternalStore` against `localStorage` via helpers in `lib/auth.ts`. That pattern is the canonical browser-state pattern for the project.

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
`accordion`, `badge`, `button`, `card`, `form`, `input`, `label`, `separator`, `sheet`, `skeleton`, `sonner`, `tabs`. Source: https://ui.shadcn.com.

> Note: this version of shadcn ships most primitives on **Base UI** (`@base-ui/react`) rather than Radix. APIs differ slightly from documentation you may have seen for Radix-based shadcn. `form.tsx` still uses Radix Label/Slot. `Button` does not support `asChild` — wrap a `<Link>` in styling classes instead of using `<Button asChild><Link/></Button>`.

**Project components**:
- `SiteHeader.tsx` — auth-aware nav, uses `useSyncExternalStore`.
- `SiteFooter.tsx` — three-column footer.
- `FAQAccordion.tsx` — wraps the Base UI `Accordion`. Uses `value={i}` per item; the root has no `type`/`collapsible` props (it defaults to single-open).
- `ScienceDiagram.tsx` — inline SVG of activated-carbon adsorption.
- `HeroBlock.tsx` — hand-built hero (the planned 21st.dev import did not produce token-compatible code in this pass; the file is structured so a future swap drops a single component in).
- `ProductGrid.tsx` — hand-built product grid for the same reason.

## Adding a new shadcn component

```bash
npx shadcn@latest add <component-name> --yes --overwrite
```

Lands in `components/ui/<component-name>.tsx`. Do not hand-edit primitives except to swap colour classes for project CSS variables. If the component fails to install or imports a missing peer dep, install it manually then re-run.

## Swapping `HeroBlock.tsx` or `ProductGrid.tsx` for a 21st.dev block (future)

Each block is a single self-contained file. To swap:

1. Use `mcp__21st-magic__21st_magic_component_inspiration` to find candidates. Verify the candidate uses Tailwind utility classes you can rewrite to CSS-variable references — reject anything that depends on `text-muted-foreground` (different token system) or external image hosts that you cannot serve.
2. Use `mcp__21st-magic__21st_magic_component_builder` to generate the code into the target file.
3. Audit for hex colours; replace with `[color:var(--…)]` references.
4. Add a comment at the top of the file: `// Source: <21st.dev URL or block name>`.

If neither block import yields a usable result, the hand-built fallbacks already in place are acceptable indefinitely.

## Conventions

- **Browser state**: read with `useSyncExternalStore`, never `useEffect` + `useState` synchronisation in the body of the effect. See `components/SiteHeader.tsx` for the canonical pattern. `setState` inside `.then()` of a Promise is allowed.
- **No hex outside `app/globals.css`**: every colour in TSX must be a `--token`.
- **Forms**: react-hook-form + zod + shadcn `Form`. Errors render via `<FormMessage />`; user-facing toasts via Sonner (`import { toast } from "sonner"`).
- **Loading states**: `Skeleton` placeholders, not spinners, for content blocks.
- **Icons**: `lucide-react` only.
- **Auth API surface**: `lib/api.ts` exposes methods on an `api` object (`api.login({ email, password })`, `api.register({ email, password, full_name })`, `api.getMyOrders()`, etc.). Returns include `access_token` (snake_case) — pass to `saveSession(access_token, user)`.
- **Field naming**: API responses use snake_case (`price_cents`, `created_at`, `total_cents`, `image_url`). Don't rename in the client; render directly.
- **Next 16 docs**: when uncertain, read `node_modules/next/dist/docs/` (per `AGENTS.md`).

## Known limitations

- Mocked product data via the FastAPI backend; no CMS.
- No cart / checkout / About page yet. The "Add to cart" button on product detail is intentionally disabled.
- Product detail route is `/products/[id]` (uses the product `id` field, not a separate `slug`). If SEO-friendly slugs are needed later, add a `slug` field server-side and alias the route.
- No light mode.
- No real product photography (SVG placeholders).
- `/orders/[id]` per-order detail not yet built.
- No automated UI tests.
- 21st.dev block imports were attempted but produced non-token-based code; hand-built fallbacks are in use.

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
