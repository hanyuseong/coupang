"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCartItem } from "@/lib/api";

type AddToCartButtonProps = {
  productId: number;
  quantity?: number;
  optionStockId?: number;
  className?: string;
  redirect?: boolean;
};

export function AddToCartButton({
  productId,
  quantity = 1,
  optionStockId,
  className,
  redirect = true,
}: AddToCartButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent parent link clicks
    if (loading) return;
    setLoading(true);
    try {
      const ok = await addCartItem(productId, quantity, optionStockId);
      if (ok) {
        router.refresh();
        if (redirect) {
          router.push("/cart");
        } else {
          if (confirm("상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")) {
            router.push("/cart");
          }
        }
      } else {
        // Check if user is logged in
        const token = localStorage.getItem("accessToken");
        if (!token) {
          if (confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")) {
            router.push("/login");
          }
        } else {
          alert("장바구니 담기에 실패했습니다. 다시 시도해주세요.");
        }
      }
    } catch (error) {
      console.error("Add to cart failed", error);
      alert("장바구니 담기에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={
        className ??
        "flex-1 rounded-md border border-coupang-blue bg-white py-4 text-center text-lg font-bold text-coupang-blue transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
      }
    >
      {loading ? "담는 중..." : "장바구니 담기"}
    </button>
  );
}
