import Image from "next/image";
import Link from "next/link";

import { Asterisk } from "../../components/editorial/Asterisk";
import { Display } from "../../components/editorial/Display";
import { Eyebrow } from "../../components/editorial/Eyebrow";
import {
  CATALOG,
  CATEGORIES,
  CATEGORY_ORDER,
} from "../../lib/catalog";
import { formatPrice } from "../../lib/auth";

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      {/* Header */}
      <header className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-9">
            <Eyebrow>CX/01 — Shop</Eyebrow>
            <h1
              className="mt-8 leading-[0.92] tracking-tight"
              style={{ fontSize: "var(--text-5xl)" }}
            >
              The full <Display>line.</Display>
            </h1>
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <p className="text-base text-[color:var(--muted)] leading-relaxed">
              Filters, papers, and kits. All built around the same activated charcoal core.
            </p>
          </div>
        </div>
      </header>

      <Asterisk />

      {/* Category sections */}
      {CATEGORY_ORDER.map((cat, catIdx) => {
        const products = CATALOG.filter((p) => p.category === cat);
        const { label, blurb } = CATEGORIES[cat];

        return (
          <section key={cat} className="pb-32" id={cat}>
            {/* Section header */}
            <div className="grid gap-8 md:grid-cols-12 items-end border-t border-[color:var(--border)] pt-12 mb-14">
              <div className="md:col-span-4">
                <Eyebrow>CX/0{catIdx + 2} — {label}</Eyebrow>
                <h2
                  className="mt-4 leading-tight tracking-tight"
                  style={{ fontSize: "var(--text-3xl)" }}
                >
                  {label}
                </h2>
              </div>
              <p className="md:col-span-5 text-base text-[color:var(--muted)] leading-relaxed">
                {blurb}
              </p>
            </div>

            {/* Product grid */}
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-[color:var(--surface-2)]" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-5 border-t border-[color:var(--border)] pt-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-medium tracking-tight leading-tight">
                        {product.name}
                      </h3>
                      <p className="font-mono text-base tabular-nums shrink-0">
                        {formatPrice(product.price_cents)}
                      </p>
                    </div>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
                      {product.tagline}
                    </p>
                    <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition-colors">
                      View details <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
