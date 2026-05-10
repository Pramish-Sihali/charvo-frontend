import Link from "next/link";

import type { Product } from "../lib/api";
import { formatPrice } from "../lib/auth";

export function ProductIndex({ products }: { products: Product[] }) {
  return (
    <ol className="border-t border-[color:var(--border)]">
      {products.map((product, i) => (
        <li key={product.id} className="border-b border-[color:var(--border)] group">
          <Link
            href={`/products/${product.id}`}
            className="grid grid-cols-12 gap-6 items-baseline py-8 transition-colors hover:bg-[color:var(--surface-2)]/50"
          >
            <span
              className="col-span-1 italic text-[color:var(--accent)]"
              style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-2xl)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className="col-span-12 md:col-span-4 leading-tight tracking-tight"
              style={{ fontSize: "var(--text-2xl)" }}
            >
              {product.name}
            </h3>
            {product.description ? (
              <p className="col-span-12 md:col-span-4 text-sm text-[color:var(--muted)] leading-relaxed">
                {product.description}
              </p>
            ) : (
              <span className="col-span-12 md:col-span-4" />
            )}
            <p
              className="col-span-6 md:col-span-2 font-mono text-base tabular-nums"
              style={{ fontSize: "var(--text-lg)" }}
            >
              {formatPrice(product.price_cents)}
            </p>
            <span
              className="col-span-6 md:col-span-1 text-right text-sm uppercase tracking-[0.2em] text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition-colors"
              aria-hidden
            >
              View →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
