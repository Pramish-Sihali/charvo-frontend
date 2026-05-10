import { notFound } from "next/navigation";
import Link from "next/link";

import { Asterisk } from "../../../components/editorial/Asterisk";
import { Display } from "../../../components/editorial/Display";
import { Eyebrow } from "../../../components/editorial/Eyebrow";
import { api, getProductById } from "../../../lib/api";
import { formatPrice } from "../../../lib/auth";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const allProducts = await api.getProducts();
  const related = allProducts.filter((p) => p.id !== id).slice(0, 3);

  const specs: Array<[string, string]> = [
    ["Diameter", "6 mm"],
    ["Length", "27 mm"],
    ["Carbon source", "Coconut shell, food-grade"],
    ["Activation", "Steam"],
    ["Use", "Single — one cigarette, one filter"],
    ["In stock", `${product.stock} packs`],
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      {/* Breadcrumb */}
      <nav className="pt-10 pb-6 text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
        <Link href="/products" className="hover:text-[color:var(--accent)]">
          ← Filters
        </Link>
      </nav>

      {/* Header ----------------------------------------------------------- */}
      <header className="pb-20">
        <div className="grid gap-16 md:grid-cols-12 items-end border-t border-[color:var(--border)] pt-10">
          <div className="md:col-span-7">
            <Eyebrow>CX/{id.slice(0, 6).toUpperCase()}</Eyebrow>
            <h1
              className="mt-6 leading-[0.92] tracking-tight"
              style={{ fontSize: "var(--text-display)" }}
            >
              {product.name}
            </h1>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p
              className="italic text-[color:var(--accent)] leading-none"
              style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-display)" }}
            >
              {formatPrice(product.price_cents)}
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--subtle)]">
              per pack — incl. shipping
            </p>
          </div>
        </div>
      </header>

      <Asterisk />

      {/* Description + CTA ----------------------------------------------- */}
      <section className="pb-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            {product.description ? (
              <p
                className="leading-snug tracking-tight max-w-2xl"
                style={{ fontSize: "var(--text-2xl)" }}
              >
                {product.description}
              </p>
            ) : (
              <p
                className="leading-snug tracking-tight max-w-2xl text-[color:var(--muted)]"
                style={{ fontSize: "var(--text-2xl)" }}
              >
                A 6&nbsp;mm activated-carbon tip designed for an honest, smoother draw.
              </p>
            )}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <button
              disabled
              title="Cart is coming soon"
              className="w-full inline-flex items-center justify-between border border-[color:var(--foreground)] px-6 py-4 text-sm uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Add to cart</span>
              <span className="text-[10px] tracking-[0.18em] text-[color:var(--subtle)]">soon</span>
            </button>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
              Cart launches with v2.
            </p>
          </div>
        </div>
      </section>

      <Asterisk />

      {/* Spec sheet ------------------------------------------------------ */}
      <section className="pb-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>CX/SPEC</Eyebrow>
            <h2
              className="mt-6 leading-tight tracking-tight"
              style={{ fontSize: "var(--text-3xl)" }}
            >
              The <Display>spec.</Display>
            </h2>
          </div>
          <dl className="md:col-span-8 divide-y divide-[color:var(--border)] border-t border-b border-[color:var(--border)]">
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-12 py-5 items-baseline">
                <dt className="col-span-5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
                  {k}
                </dt>
                <dd className="col-span-7 text-base text-[color:var(--foreground)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Asterisk />

      {/* Honest answers -------------------------------------------------- */}
      <section className="pb-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>CX/HONEST</Eyebrow>
            <h2
              className="mt-6 leading-tight tracking-tight"
              style={{ fontSize: "var(--text-3xl)" }}
            >
              Honest <Display>answers.</Display>
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
                Does this make smoking safe?
              </p>
              <p className="mt-3 text-base text-[color:var(--foreground)] leading-relaxed">
                No. Smoking remains harmful. CharcoalX is a harm-reduction filter that adsorbs particulate and tar for a cleaner draw — not a health product, and not a substitute for quitting. If quitting is on the table, choose that.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
                Will it ruin the flavor?
              </p>
              <p className="mt-3 text-base text-[color:var(--foreground)] leading-relaxed">
                It removes some particulate and acrid notes. Most people describe the draw as smoother, not flavorless. Strong tobaccos still taste like themselves.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
                One filter, one cigarette?
              </p>
              <p className="mt-3 text-base text-[color:var(--foreground)] leading-relaxed">
                Yes. Activated carbon saturates as it works. Reusing a filter past one cigarette stops giving you the benefit you paid for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related --------------------------------------------------------- */}
      {related.length > 0 ? (
        <>
          <Asterisk />
          <section className="pb-32">
            <header className="grid gap-8 md:grid-cols-12 border-t border-[color:var(--border)] pt-10 mb-10">
              <div className="md:col-span-4">
                <Eyebrow>CX/MORE</Eyebrow>
              </div>
              <h2
                className="md:col-span-8 leading-tight tracking-tight"
                style={{ fontSize: "var(--text-3xl)" }}
              >
                More from the <Display>line.</Display>
              </h2>
            </header>
            <ul className="border-t border-[color:var(--border)]">
              {related.map((p, i) => (
                <li key={p.id} className="border-b border-[color:var(--border)] group">
                  <Link
                    href={`/products/${p.id}`}
                    className="grid grid-cols-12 gap-6 items-baseline py-6 transition-colors hover:bg-[color:var(--surface-2)]/50"
                  >
                    <span
                      className="col-span-1 italic text-[color:var(--accent)]"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="col-span-12 md:col-span-7 text-lg font-medium tracking-tight">
                      {p.name}
                    </h3>
                    <p className="col-span-6 md:col-span-3 font-mono text-base tabular-nums">
                      {formatPrice(p.price_cents)}
                    </p>
                    <span
                      className="col-span-6 md:col-span-1 text-right text-sm uppercase tracking-[0.2em] text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition-colors"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
    </div>
  );
}
