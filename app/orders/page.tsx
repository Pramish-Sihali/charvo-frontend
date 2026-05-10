"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Asterisk } from "../../components/editorial/Asterisk";
import { Display } from "../../components/editorial/Display";
import { Eyebrow } from "../../components/editorial/Eyebrow";
import { Skeleton } from "../../components/ui/skeleton";
import { api } from "../../lib/api";
import type { Order } from "../../lib/api";
import { formatPrice, getToken } from "../../lib/auth";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  // Evaluate auth synchronously on first render to avoid setState-in-effect lint error
  const [unauthorized] = useState<boolean>(() => !getToken());

  useEffect(() => {
    if (unauthorized) return;
    let cancelled = false;
    api
      .getMyOrders()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch(() => {
        if (!cancelled) setOrders([]);
      });
    return () => {
      cancelled = true;
    };
  }, [unauthorized]);

  if (unauthorized) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 pt-32 pb-32">
        <Eyebrow>CX/03 — Orders</Eyebrow>
        <h1
          className="mt-8 leading-[0.92] tracking-tight"
          style={{ fontSize: "var(--text-5xl)" }}
        >
          Sign in to <Display>see your orders.</Display>
        </h1>
        <Link
          href="/login"
          className="mt-12 inline-flex items-center gap-3 border-b border-[color:var(--foreground)] pb-2 text-sm uppercase tracking-[0.2em] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
        >
          Sign in <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      <header className="pt-20 md:pt-32 pb-20">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-9">
            <Eyebrow>CX/03 — Orders</Eyebrow>
            <h1
              className="mt-8 leading-[0.92] tracking-tight"
              style={{ fontSize: "var(--text-5xl)" }}
            >
              Your <Display>line.</Display>
            </h1>
          </div>
        </div>
      </header>

      <Asterisk />

      <section className="pb-32">
        {orders === null ? (
          <div className="space-y-2 border-t border-[color:var(--border)]">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-20 w-full bg-[color:var(--surface-2)] rounded-none"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="border-t border-[color:var(--border)] py-32 text-center">
            <Eyebrow>Empty</Eyebrow>
            <p
              className="mt-6 leading-tight tracking-tight"
              style={{ fontSize: "var(--text-3xl)" }}
            >
              No orders <Display>yet.</Display>
            </p>
            <Link
              href="/products"
              className="mt-10 inline-flex items-center gap-3 border-b border-[color:var(--foreground)] pb-2 text-sm uppercase tracking-[0.2em] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
            >
              Shop filters <span aria-hidden>→</span>
            </Link>
          </div>
        ) : (
          <ol className="border-t border-[color:var(--border)]">
            {orders.map((order, i) => (
              <li key={order.id} className="border-b border-[color:var(--border)]">
                <div className="grid grid-cols-12 gap-6 items-baseline py-6">
                  <span
                    className="col-span-1 italic text-[color:var(--accent)]"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-2xl)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-12 md:col-span-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
                      Order
                    </p>
                    <p className="mt-1 font-mono text-sm">#{order.id.slice(0, 8)}</p>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
                      Placed
                    </p>
                    <p className="mt-1 text-sm">
                      {new Date(order.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--subtle)]">
                      Total
                    </p>
                    <p className="mt-1 font-mono text-sm tabular-nums">
                      {formatPrice(order.total_cents)}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-2 md:text-right">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)]">
                      {order.status}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
