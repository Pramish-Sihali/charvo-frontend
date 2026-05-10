"use client";

import { useEffect, useState } from "react";

import { Asterisk } from "../../components/editorial/Asterisk";
import { Display } from "../../components/editorial/Display";
import { Eyebrow } from "../../components/editorial/Eyebrow";
import { ProductIndex } from "../../components/ProductIndex";
import { Skeleton } from "../../components/ui/skeleton";
import { api } from "../../lib/api";
import type { Product } from "../../lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      <header className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-9">
            <Eyebrow>CX/01 — Filters</Eyebrow>
            <h1
              className="mt-8 leading-[0.92] tracking-tight"
              style={{ fontSize: "var(--text-5xl)" }}
            >
              Pick a pack <Display>that</Display> matches{" "}
              <Display>your</Display> habit.
            </h1>
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <p className="text-base text-[color:var(--muted)] leading-relaxed">
              All filters are 6&nbsp;mm activated charcoal, single-use, fits American Spirit and rolling tobacco. Pick by quantity.
            </p>
          </div>
        </div>
      </header>

      <Asterisk />

      <section className="pb-32">
        {products === null ? (
          <div className="space-y-2 border-t border-[color:var(--border)]">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-24 w-full bg-[color:var(--surface-2)] rounded-none"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="border-t border-[color:var(--border)] py-32 text-center">
            <Eyebrow>Out of stock</Eyebrow>
            <p
              className="mt-6 leading-tight tracking-tight"
              style={{ fontSize: "var(--text-3xl)" }}
            >
              No filters available right now.
            </p>
            <p className="mt-4 text-sm text-[color:var(--muted)]">
              Check back soon — our line is being restocked.
            </p>
          </div>
        ) : (
          <ProductIndex products={products} />
        )}
      </section>
    </div>
  );
}
