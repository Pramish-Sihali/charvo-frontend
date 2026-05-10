"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { ApiError, api } from "../../lib/api";
import type { Order } from "../../lib/api";
import { formatPrice, getToken } from "../../lib/auth";

const statusVariant: Record<string, string> = {
  pending: "bg-[color:var(--surface-2)] text-[color:var(--muted)]",
  paid: "bg-[color:var(--success)]/15 text-[color:var(--success)] border border-[color:var(--success)]/30",
  shipped: "bg-[color:var(--accent)]/15 text-[color:var(--accent)] border border-[color:var(--accent)]/30",
  cancelled: "bg-[color:var(--danger)]/15 text-[color:var(--danger)] border border-[color:var(--danger)]/30",
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    let cancelled = false;
    api
      .getMyOrders()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
          return;
        }
        if (!cancelled) setOrders([]);
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (orders === null) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full bg-[color:var(--surface-2)]" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">No orders yet</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          When you place your first order it will show up here.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-[color:var(--accent)] px-5 py-3 text-sm font-medium text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent-strong)] transition"
        >
          Shop filters
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Your orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-[color:var(--surface-1)] border-[color:var(--border)]">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-base">Order #{order.id}</CardTitle>
              <Badge className={statusVariant[order.status] ?? statusVariant.pending}>
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="text-sm text-[color:var(--muted)] flex justify-between">
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
              <span className="font-mono text-[color:var(--foreground)]">
                {formatPrice(order.total_cents)}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
