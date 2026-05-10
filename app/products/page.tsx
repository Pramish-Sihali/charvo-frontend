"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "../../components/Button";
import { ApiError, api, type Product } from "../../lib/api";
import { formatPrice, getToken } from "../../lib/auth";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const refresh = useCallback(async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  async function buy(p: Product) {
    if (!getToken()) {
      router.push("/login");
      return;
    }
    setBusyId(p.id);
    try {
      const qty = quantities[p.id] ?? 1;
      await api.createOrder({ product_id: p.id, quantity: qty });
      setToast(`Order placed: ${qty} × ${p.name}`);
      await refresh();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.push("/login");
        return;
      }
      setToast(err instanceof Error ? err.message : "Order failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Filters</h1>
          <p className="text-sm text-[color:var(--muted)] mt-1">
            Pick your pack. Stock updates live as orders come in.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-[color:var(--danger)]/40 bg-[color:var(--danger)]/10 p-4 text-sm text-[color:var(--danger)] mb-6">
          {error}
        </div>
      )}

      {products === null ? (
        <ProductsSkeleton />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const qty = quantities[p.id] ?? 1;
            const stockLabel =
              p.stock === 0
                ? "Out of stock"
                : p.stock < 20
                  ? "Low stock"
                  : "In stock";
            const stockClass =
              p.stock === 0
                ? "text-[color:var(--danger)]"
                : p.stock < 20
                  ? "text-amber-400"
                  : "text-[color:var(--success)]";
            return (
              <div
                key={p.id}
                className="flex flex-col rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden hover:border-[color:var(--accent)]/40 transition-colors"
              >
                {p.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="h-48 w-full object-cover bg-[color:var(--surface-2)]"
                  />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold leading-tight">{p.name}</h2>
                    <span className="text-base font-semibold whitespace-nowrap">
                      {formatPrice(p.price_cents)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className={stockClass}>{stockLabel}</span>
                    <span className="text-[color:var(--muted)]">{p.stock} left</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <select
                      aria-label="Quantity"
                      disabled={p.stock === 0}
                      value={qty}
                      onChange={(e) =>
                        setQuantities((q) => ({
                          ...q,
                          [p.id]: Number(e.target.value),
                        }))
                      }
                      className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--accent)]"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={() => buy(p)}
                      disabled={p.stock === 0 || busyId === p.id}
                      fullWidth
                    >
                      {busyId === p.id ? "Placing…" : p.stock === 0 ? "Sold out" : "Buy"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-md border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-80 animate-pulse rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]"
        />
      ))}
    </div>
  );
}
