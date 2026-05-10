import Link from "next/link";

import { Card, CardContent } from "./ui/card";
import { formatPrice } from "../lib/auth";
import type { Product } from "../lib/api";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const slug = product.id;
        const blurb = product.description ?? "";
        return (
          <Link key={slug} href={`/products/${slug}`} className="group">
            <Card className="bg-[color:var(--surface-1)] border-[color:var(--border)] overflow-hidden transition-colors group-hover:border-[color:var(--accent)]/40">
              <div className="relative aspect-[4/3] flex items-center justify-center bg-[color:var(--surface-2)]">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    viewBox="0 0 200 200"
                    className="w-32 h-32 text-[color:var(--accent)]"
                    fill="none"
                    aria-hidden
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      stroke="currentColor"
                      strokeOpacity="0.25"
                      strokeWidth="2"
                    />
                    <rect
                      x="80"
                      y="50"
                      width="40"
                      height="100"
                      rx="20"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="var(--surface-1)"
                    />
                    <rect
                      x="80"
                      y="50"
                      width="40"
                      height="25"
                      rx="20"
                      fill="currentColor"
                      fillOpacity="0.85"
                    />
                  </svg>
                )}
              </div>
              <CardContent className="pt-4 pb-5">
                <h3 className="text-base font-semibold tracking-tight">
                  {product.name}
                </h3>
                {blurb ? (
                  <p className="mt-1 text-xs text-[color:var(--muted)] leading-relaxed line-clamp-2">
                    {blurb}
                  </p>
                ) : null}
                <p className="mt-3 font-mono text-sm text-[color:var(--accent)]">
                  {formatPrice(product.price_cents)}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
