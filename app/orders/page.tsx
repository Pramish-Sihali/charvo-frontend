"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ApiError, api, type Order } from "../../lib/api";
import { formatPrice, getToken } from "../../lib/auth";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    api
      .getMyOrders()
      .then((data) => setOrders(data))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to load orders");
      });
  }, [router]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Your orders</h1>
      <p className="text-sm text-[color:var(--muted)] mb-8">
        Newest first. Status reflects what we have on file.
      </p>

      {error && (
        <div className="rounded-md border border-[color:var(--danger)]/40 bg-[color:var(--danger)]/10 p-4 text-sm text-[color:var(--danger)] mb-6">
          {error}
        </div>
      )}

      {orders === null ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-md border border-[color:var(--border)] bg-[color:var(--surface)]"
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-10 text-center">
          <p className="text-sm text-[color:var(--muted)] mb-4">
            No orders yet. Browse filters.
          </p>
          <Link
            href="/products"
            className="inline-flex rounded-md bg-[color:var(--accent)] px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-[color:var(--accent-strong)]"
          >
            Shop filters
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--surface-2)] text-xs uppercase tracking-wide text-[color:var(--muted)]">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-right font-medium">Qty</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-t border-[color:var(--border)]"
                >
                  <td className="px-4 py-3">{o.product?.name ?? o.product_id}</td>
                  <td className="px-4 py-3 text-right">{o.quantity}</td>
                  <td className="px-4 py-3 text-right">
                    {formatPrice(o.total_cents)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-[color:var(--success)]/15 px-2 py-0.5 text-xs text-[color:var(--success)]">
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-[color:var(--muted)]">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
