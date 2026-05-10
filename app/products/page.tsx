"use client";

import { useEffect, useState } from "react";

import { api } from "../../lib/api";
import type { Product } from "../../lib/api";
import { ProductGrid } from "../../components/ProductGrid";
import { Skeleton } from "../../components/ui/skeleton";

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

  if (products === null) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight">Filters</h1>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full bg-[color:var(--surface-2)]" />
          ))}
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          No filters available
        </h1>
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
          Slim 6 mm activated-charcoal tips. Pick a pack size that matches your
          habit.
        </p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
