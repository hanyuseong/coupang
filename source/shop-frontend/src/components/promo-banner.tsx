import { formatCurrency } from "@/lib/utils";
import { Product } from "@/lib/types";

type PromoBannerProps = {
  product?: Product;
};

export function PromoBanner({ product }: PromoBannerProps) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-coupang-blue via-coupang-navy to-[#021734] p-6 text-white shadow-floating">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="space-y-4 lg:w-1/2">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-xs font-semibold">
            <span className="size-2 rounded-full bg-coupang-yellow" />
            단 2시간 남은 로켓특가
          </p>
          <h2 className="text-3xl font-bold leading-tight">
            {product?.name ?? "인기 상품 실시간 랭킹"}
          </h2>
          <p className="text-sm text-white/80">
            {product?.description ??
              "새벽 7시 전 도착 보장 · 와우회원 최대 15% 즉시할인 · 무료반품"}
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-coupang-yellow">
              {formatCurrency(product?.discountPrice ?? product?.price ?? 0)}
            </span>
            {product?.discountPrice && product?.price && (
              <span className="text-white/60 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-white/80">
            <span className="rounded-full border border-white/30 px-3 py-1">
              로켓배송
            </span>
            <span className="rounded-full border border-white/30 px-3 py-1">
              무료반품
            </span>
            <span className="rounded-full border border-white/30 px-3 py-1">
              와우회원 10% 적립
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white/10 p-4">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>실시간 배송현황</span>
            <span className="text-coupang-yellow">오늘 1,248건 출고</span>
          </div>
          <div className="space-y-4">
            {[65, 82, 43].map((progress, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs text-white/70">
                  <span>
                    {index === 0
                      ? "새벽 배송"
                      : index === 1
                        ? "로켓배송"
                        : "해외직구"}
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-coupang-yellow"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
