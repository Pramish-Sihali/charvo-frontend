import { notFound } from "next/navigation";
import Link from "next/link";

import { getProductById } from "../../../lib/api";
import { formatPrice } from "../../../lib/auth";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/products"
        className="text-xs text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
      >
        ← Back to filters
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <Card className="bg-[color:var(--surface-1)] border-[color:var(--border)]">
          <CardContent className="flex aspect-square items-center justify-center p-10">
            <svg
              viewBox="0 0 320 320"
              className="w-full max-w-xs text-[color:var(--accent)]"
              fill="none"
              aria-hidden
            >
              <circle
                cx="160"
                cy="160"
                r="120"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="2"
              />
              <circle
                cx="160"
                cy="160"
                r="80"
                stroke="currentColor"
                strokeOpacity="0.4"
                strokeWidth="2"
              />
              <rect
                x="120"
                y="60"
                width="80"
                height="200"
                rx="40"
                stroke="currentColor"
                strokeWidth="2"
                fill="var(--surface-2)"
              />
              <rect
                x="120"
                y="60"
                width="80"
                height="50"
                rx="40"
                fill="currentColor"
                fillOpacity="0.85"
              />
            </svg>
          </CardContent>
        </Card>

        {/* Spec */}
        <div>
          <Badge className="bg-[color:var(--surface-2)] text-[color:var(--accent)] border border-[color:var(--accent)]/30 hover:bg-[color:var(--surface-2)]">
            6 mm activated charcoal
          </Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-2 text-2xl text-[color:var(--accent)] font-mono">
            {formatPrice(product.price_cents)}
          </p>
          {product.description ? (
            <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
              {product.description}
            </p>
          ) : null}

          <Button className="mt-6 bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent-strong)]">
            Add to cart
          </Button>

          <Tabs defaultValue="overview" className="mt-10">
            <TabsList className="bg-[color:var(--surface-2)]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="spec">Spec</TabsTrigger>
              <TabsTrigger value="honest">Honest answers</TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="text-sm text-[color:var(--muted)] leading-relaxed pt-4"
            >
              {product.description ?? "No description available."}
            </TabsContent>
            <TabsContent
              value="spec"
              className="text-sm text-[color:var(--muted)] pt-4"
            >
              <ul className="space-y-2">
                <li>Diameter: 6 mm</li>
                <li>Length: 27 mm</li>
                <li>Carbon source: coconut shell</li>
                <li>Single use</li>
              </ul>
            </TabsContent>
            <TabsContent
              value="honest"
              className="text-sm text-[color:var(--muted)] leading-relaxed pt-4"
            >
              CharcoalX is a harm-reduction product. It does not make smoking
              safe. If quitting is on the table, prefer that.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
