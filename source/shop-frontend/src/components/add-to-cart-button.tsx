"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCartItem } from "@/lib/api";

type AddToCartButtonProps = {
  productId: number;
  quantity?: number;
  optionStockId?: number;
  className?: string;
};

export function AddToCartButton({
  productId,
  quantity = 1,
  optionStockId,
  className,
}: AddToCartButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const ok = await addCartItem(productId, quantity, optionStockId);
      if (ok) {
        router.push("/cart");
      } else {
        alert("장바구니 담기에 실패했습니다. 다시 시도해주세요.");
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
