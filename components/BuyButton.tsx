"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { api, ApiError } from "../lib/api";

export function BuyButton({ productId, stock }: { productId: string; stock: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    setLoading(true);
    try {
      await api.createOrder({ product_id: productId, quantity: 1 });
      toast.success("Order placed");
      router.push("/orders");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.push("/login");
        return;
      }
      toast.error(err instanceof Error ? err.message : "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const outOfStock = stock === 0;

  return (
    <button
      onClick={buy}
      disabled={loading || outOfStock}
      className="w-full inline-flex items-center justify-between border border-[color:var(--foreground)] px-6 py-4 text-sm uppercase tracking-[0.2em] hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>
        {outOfStock ? "Out of stock" : loading ? "Placing order…" : "Buy — 1 pack"}
      </span>
      {!outOfStock && <span aria-hidden>→</span>}
    </button>
  );
}
