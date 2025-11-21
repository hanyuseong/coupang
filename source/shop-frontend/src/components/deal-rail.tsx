import { Product } from "@/lib/types";
import { calcDiscountPercent, formatCurrency } from "@/lib/utils";
import Image from "next/image";

type DealRailProps = {
  products: Product[];
};

export function DealRail({ products }: DealRailProps) {
  if (!products.length) return null;

  return (
    <section className="space-y-4 rounded-3xl bg-white p-5 shadow-floating">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-coupang-red">번개특가</p>
          <h2 className="text-xl font-bold text-slate-900">
            단시간 쏟아지는 와우 전용 특가
          </h2>
        </div>
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-coupang-blue hover:text-coupang-blue">
          더 많은 특가
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((product) => {
          const discount = calcDiscountPercent(
            product.price,
            product.discountPrice,
          );

          return (
            <article
              key={product.productId}
              className="min-w-[220px] flex-1 rounded-2xl border border-slate-100 bg-slate-50 p-3"
            >
              <div className="relative h-36 overflow-hidden rounded-2xl bg-white">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    이미지 준비중
                  </div>
                )}
                {discount && (
                  <div className="absolute left-3 top-3 rounded-full bg-coupang-red px-2 py-1 text-[11px] font-bold text-white">
                    {discount}% OFF
                  </div>
                )}
              </div>
              <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-slate-800">
                {product.name}
              </h3>
              <p className="mt-1 text-lg font-extrabold text-coupang-blue">
                {formatCurrency(product.discountPrice ?? product.price)}
              </p>
              <p className="text-xs text-slate-400">
                리뷰 {product.reviewCount?.toLocaleString() ?? 0}건 · ⭐
                {product.rating?.toFixed(1) ?? "4.5"}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
