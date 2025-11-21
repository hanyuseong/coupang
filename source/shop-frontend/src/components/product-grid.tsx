"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  title: string;
  subtitle?: string;
  products: Product[];
  initialVisibleCount?: number;
};

export function ProductGrid({
  title,
  subtitle,
  products,
  initialVisibleCount = 6,
}: ProductGridProps) {
  const visibleCount = Math.max(1, initialVisibleCount);
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll
    ? products
    : products.slice(0, visibleCount);

  const hasHiddenItems = products.length > visibleCount;

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs font-semibold text-coupang-blue">추천 PICK</p>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        {hasHiddenItems && !showAll && (
          <button
            type="button"
            className="text-sm font-semibold text-coupang-blue"
            onClick={() => setShowAll(true)}
          >
            전체 보기 &rarr;
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            highlight={false}
          />
        ))}
      </div>
    </section>
  );
}
