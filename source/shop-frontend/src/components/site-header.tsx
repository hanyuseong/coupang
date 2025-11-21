import { SearchBar } from "./search-bar";

type SiteHeaderProps = {
  suggestionKeywords: string[];
  cartCount: number;
};

export function SiteHeader({
  suggestionKeywords,
  cartCount,
}: SiteHeaderProps) {
  return (
    <header className="w-full border-b border-white/40 bg-gradient-to-r from-coupang-blue via-coupang-blue to-coupang-navy pb-6 pt-4 text-white shadow-floating">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-coupang-blue">
                WOW
              </span>
              <p className="text-xs text-white/80">
                새벽 7시 전 도착 · 로켓배송 전용관
              </p>
            </div>
            <div className="text-3xl font-extrabold tracking-tight">
              Coupang Style
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm font-medium lg:flex">
            <button className="flex flex-col items-center gap-1 text-white/80">
              <span className="rounded-lg bg-white/15 px-2 py-1 text-[10px]">
                내 주문
              </span>
              <span>마이쿠팡</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/80">
              <span className="rounded-lg bg-white/15 px-2 py-1 text-[10px]">
                혜택
              </span>
              <span>이벤트</span>
            </button>
            <button className="relative flex flex-col items-center gap-1 text-white">
              <span className="rounded-lg bg-white/15 px-2 py-1 text-[10px]">
                장바구니
              </span>
              <span>Cart</span>
              <span className="absolute -right-2 -top-2 rounded-full bg-coupang-red px-2 text-xs font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        <SearchBar suggestions={suggestionKeywords} />

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          {["로켓배송", "로켓프레시", "쿠팡비즈", "골드박스", "와우할인", "여행/티켓"].map(
            (keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-white/30 px-3 py-1 text-white/90"
              >
                #{keyword}
              </span>
            ),
          )}
        </div>
      </div>
    </header>
  );
}
