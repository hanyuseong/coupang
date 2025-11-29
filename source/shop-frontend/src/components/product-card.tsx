"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { calcDiscountPercent, formatCurrency, getImageUrl } from "@/lib/utils";
import { addCartItem } from "@/lib/api";

type ProductCardProps = {
  product: Product;
  highlight?: boolean;
};

export function ProductCard({ product, highlight }: ProductCardProps) {
  const discount = calcDiscountPercent(product.price, product.discountPrice);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    console.log("Add to cart clicked for product:", product.productId);

    try {
      const success = await addCartItem(product.productId, 1);
      console.log("Add cart result:", success);

      if (success) {
        console.log("Success! Asking user about cart navigation");
        if (confirm("상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")) {
          window.location.href = "/cart";
        }
      } else {
        console.log("Failed to add to cart, checking login status");
        // Check if user is logged in
        const token = localStorage.getItem("accessToken");
        console.log("Token exists:", !!token);

        if (!token) {
          window.location.href = "/login";
        } else {
          console.log("Token exists but add failed");
          alert("장바구니 담기에 실패했습니다. 다시 시도해주세요.");
        }
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      console.log("Error occurred, checking login status");

      // Also check login on error
      const token = localStorage.getItem("accessToken");
      console.log("Token exists (in catch):", !!token);

      if (!token) {
        window.location.href = "/login";
      } else {
        // If token exists but an error occurred, redirect to home or show a generic error page
        window.location.href = "/"; // Redirect to home page
      }
    }
  };

  return (
    <article
      className={`flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-floating ${highlight ? "lg:col-span-2" : ""
        }`}
    >
      <Link href={`/products/${product.productId}`} className="contents">
        <div className="relative aspect-square w-1/2 mx-auto overflow-hidden rounded-2xl bg-coupang-gray">
          <Image
            src={getImageUrl(product.thumbnail, product.productId)}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
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
      <button
        onClick={handleAddToCart}
        className="mt-auto w-full rounded-2xl bg-coupang-blue/10 py-2 text-sm font-semibold text-coupang-blue transition hover:bg-coupang-blue hover:text-white"
      >
        장바구니 담기
      </button>
    </article>
  );
}
