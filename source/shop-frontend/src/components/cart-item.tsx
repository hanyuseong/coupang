"use client";

import Link from "next/link";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CartItem as CartItemType } from "@/lib/types";

type CartItemProps = {
    item: CartItemType;
    onRemove: (cartItemId: number) => void;
    onUpdateQuantity: (cartItemId: number, quantity: number) => void;
};

export function CartItem({ item, onRemove, onUpdateQuantity, checked, onCheck }: CartItemProps & { checked: boolean; onCheck: (checked: boolean) => void }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleRemove = () => {
        onRemove(item.cartItemId);
    };

    const handleQuantityChange = async (newQuantity: number) => {
        if (newQuantity < 1) return;

        setIsUpdating(true);
        setQuantity(newQuantity);

        try {
            await onUpdateQuantity(item.cartItemId, newQuantity);
        } catch (error) {
            console.error("Failed to update quantity:", error);
            setQuantity(item.quantity); // 실패 시 원래 수량으로 되돌림
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex gap-4">
            {/* Checkbox */}
            <div className="flex items-start pt-1">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onCheck(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-coupang-blue focus:ring-coupang-blue"
                />
            </div>

            <div className="flex-1">
                <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition z-10"
                    aria-label="삭제"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="flex items-start justify-between gap-4 pr-8">
                    <div className="flex-1 space-y-2">
                        <p className="text-xs font-semibold text-coupang-blue">
                            상품번호 {item.productId}
                        </p>
                        <p className="text-lg font-bold text-slate-800">
                            {item.productName}
                        </p>
                        <p className="text-sm text-slate-500">
                            단가 {formatCurrency(item.price)}
                        </p>

                        {/* 수량 조절 UI */}
                        <div className="flex items-center gap-2 mt-3">
                            <span className="text-sm text-slate-600">수량</span>
                            <div className="flex items-center border border-slate-300 rounded-md">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={isUpdating || quantity <= 1}
                                    className="px-3 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    −
                                </button>
                                <span className="px-4 py-1 text-sm font-semibold border-x border-slate-300 min-w-[50px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={isUpdating}
                                    className="px-3 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-extrabold text-coupang-blue">
                            {formatCurrency(item.price * quantity)}
                        </p>
                        <Link
                            href={`/products/${item.productId}`}
                            className="text-xs font-semibold text-coupang-blue underline hover:text-coupang-navy"
                        >
                            상품 자세히 보기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
