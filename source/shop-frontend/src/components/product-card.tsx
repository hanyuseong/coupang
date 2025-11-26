import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { calcDiscountPercent, formatCurrency } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  highlight?: boolean;
};

export function ProductCard({ product, highlight }: ProductCardProps) {
  const discount = calcDiscountPercent(product.price, product.discountPrice);

  return (
    <article
      className={`flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-floating ${highlight ? "lg:col-span-2" : ""
        }`}
    >
      <Link href={`/products/${product.productId}`} className="contents">
        <div className="relative aspect-square w-1/2 mx-auto overflow-hidden rounded-2xl bg-coupang-gray">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              이미지 준비중
            </div>
          )}
          {discount && (
            <span className="absolute left-3 top-3 rounded-full bg-coupang-red px-3 py-1 text-xs font-bold text-white">
              {discount}%
            </span>
          )}
          {product.deliveryType?.toLowerCase().includes("rocket") && (
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-coupang-blue">
              ROCKET
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <p className="text-xs uppercase text-slate-400">{product.brand}</p>
          <h3 className="mt-1 text-base font-semibold text-slate-800">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-coupang-blue">
              {formatCurrency(product.discountPrice ?? product.price)}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              ⭐ {product.rating?.toFixed(1) ?? "4.5"}
            </span>
            <span>리뷰 {product.reviewCount?.toLocaleString() ?? "0"}개</span>
          </div>
        </div>
      </Link>
      <button className="mt-auto w-full rounded-2xl bg-coupang-blue/10 py-2 text-sm font-semibold text-coupang-blue transition hover:bg-coupang-blue hover:text-white">
        장바구니 담기
      </button>
    </article>
  );
}
