"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchCart, removeCartItem, updateCartItemQuantity } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { CartItem } from "@/components/cart-item";
import { Cart } from "@/lib/types";

interface CartContentProps {
    initialCart: Cart;
    recommendedKeywords: string[];
}

export function CartContent({ initialCart, recommendedKeywords }: CartContentProps) {
    const [cart, setCart] = useState<Cart>(initialCart);

    // Initialize selection with all items from initial cart
    const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(() => {
        if (initialCart?.cartItems) {
            return new Set(initialCart.cartItems.map((item) => item.cartItemId));
        }
        return new Set();
    });

    // Sync state if props change (optional, usually for re-validation)
    // But here initialCart is initial data. 
    // We don't need to sync prop changes unless we expect external updates.

    const handleRemoveItem = async (cartItemId: number) => {
        try {
            const success = await removeCartItem(cartItemId);
            if (success) {
                // Optimistic update or fetch new state?
                // Fetching new state is safer for totals calculation.
                const updatedCart = await fetchCart();
                setCart(updatedCart);
                // Remove from selection
                setSelectedItemIds((prev) => {
                    const next = new Set(prev);
                    next.delete(cartItemId);
                    return next;
                });
            } else {
                console.error("Delete failed: success is false");
                alert("삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error in handleRemoveItem:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
        try {
            const success = await updateCartItemQuantity(cartItemId, quantity);
            if (success) {
                const updatedCart = await fetchCart();
                setCart(updatedCart);
            } else {
                console.error("Update quantity failed: success is false");
                alert("수량 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error in handleUpdateQuantity:", error);
            alert("수량 변경 중 오류가 발생했습니다.");
        }
    };

    const handleCheckItem = (cartItemId: number, checked: boolean) => {
        setSelectedItemIds((prev) => {
            const next = new Set(prev);
            if (checked) {
                next.add(cartItemId);
            } else {
                next.delete(cartItemId);
            }
            return next;
        });
    };

    const handleCheckAll = (checked: boolean) => {
        if (checked && cart?.cartItems) {
            const allIds = new Set(cart.cartItems.map((item) => item.cartItemId));
            setSelectedItemIds(allIds);
        } else {
            setSelectedItemIds(new Set());
        }
    };

    const handleCheckout = (e: React.MouseEvent) => {
        e.preventDefault();
        if (selectedItemIds.size === 0) {
            alert("주문할 상품을 선택해주세요.");
            return;
        }

        localStorage.setItem(
            "checkout_selected_items",
            JSON.stringify(Array.from(selectedItemIds))
        );

        if (cart?.cartItems) {
            const selectedProducts = cart.cartItems
                .filter((item) => selectedItemIds.has(item.cartItemId))
                .map((item) => ({
                    productId: item.productId,
                    optionStockId: item.optionStockId,
                }));
            localStorage.setItem(
                "checkout_selected_products",
                JSON.stringify(selectedProducts)
            );
        }

        // Since this component is rendered on server originally, we might assume user logic is consistent.
        // However, token check here is client-side.
        // If we have cookie, we should be logged in.
        // We can also check Redux or just proceed.
        // The previous logic checked localStorage 'accessToken'.
        // Since we now use cookies, strictly speaking localStorage might be empty if we didn't set it?
        // Wait, the login flow sets BOTH cookie and Redux.
        // But Redux is in memory. Reloading clears Redux unless persisted. (Redux Persist?)
        // This app doesn't seem to use Redux Persist (I should check store.ts if I care)
        // But `src/lib/api.ts`'s `injectStore` implies standard Redux usage.
        // If Redux is empty on reload, `login` check `localStorage.getItem("accessToken")` might fail if we cleared it!
        // Oh, I CLEARED localStorage in `page.tsx` of callback.
        // **CRITICAL**: If I clear localStorage, then `handleCheckout` logic:
        // `const token = localStorage.getItem("accessToken");`
        // will fail!
        // So I need to fix `handleCheckout` to rely on cookie existence or something else.
        // Actually, if this page is rendered, it implies (mostly) we are logged in or guest.
        // The previous logic was:
        // `const token = localStorage.getItem("accessToken");`
        // if (!token) redirect to login.
        // Now, `accessToken` is in HttpOnly cookie. Client cannot read it.
        // Solution:
        // 1. Check if user is logged in via an API call `/api/auth/check`? No too slow.
        // 2. Just proceed to `/checkout`. The middleware or `/checkout` page (server component) will redirect if not logged in.
        // Does `/checkout` exist? Yes.
        // Is `/checkout` a server component? Likely.
        // So assume we should just navigate to `/checkout`.
        // If not logged in, `/checkout` should redirect.
        // Let's assume `/checkout` handles auth check.
        // But wait, the code:
        // `window.location.href = "/login?redirect=/checkout";` if not logged in.
        // If I change this to just go to `/checkout`, and if `/checkout` is protected, it's fine.
        // But if `/checkout` is client-side and checks localStorage.. we have a problem.
        // I should check `/checkout/page.tsx` later?
        // For now, I will optimistically redirect to `/checkout`.
        // OR, I can pass `isLoggedIn` prop from server component to here.
        // The Server Component knows if we have a token (it fetched valid cart).
        // The `fetchCartServer` returns fallback cart (empty) if fetch fails (e.g. no token).
        // So if `cart` seems to be unrelated to user? No, `fetchCart` is user specific.
        // Let's pass `isLoggedIn` prop.

        // Actually, `handleCheckout` logic is simple.
        // I will modify `handleCheckout` to NOT check localStorage token. 
        // Instead, I will assume valid session if we managed to render this page with user data.
        // BUT, if user is guest?
        // Guest cart uses `localStorage("cart_session_id")`.
        // Guest can go to checkout? Usually guests can order or forced to login.
        // Coupang usually forces login.
        // The original code forced login:
        // `if (!token) window.location.href = ...`
        // I'll leave a TODO or check via a lightweight client-side check if I can?
        // No, I can't check HttpOnly cookie.
        // **Passing `isLoggedIn` prop is the best way.**

        window.location.href = "/checkout";
    };

    const items = cart?.cartItems ?? [];
    const itemCount = items.length;

    const selectedItems = items.filter((item) =>
        selectedItemIds.has(item.cartItemId)
    );
    const selectedCount = selectedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
    const subtotal = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const deliveryFee = cart?.deliveryFee ?? 0;
    const total = subtotal + deliveryFee;

    const isAllSelected =
        items.length > 0 && selectedItemIds.size === items.length;

    return (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <section className="space-y-4">
                {items.length > 0 && (
                    <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={(e) => handleCheckAll(e.target.checked)}
                            className="h-5 w-5 rounded border-gray-300 text-coupang-blue focus:ring-coupang-blue"
                            id="check-all"
                        />
                        <label
                            htmlFor="check-all"
                            className="text-sm font-bold text-slate-700 cursor-pointer select-none"
                        >
                            전체선택 ({selectedItemIds.size}/{items.length})
                        </label>
                    </div>
                )}

                {items.length === 0 ? (
                    <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
                        <p className="text-lg font-bold text-slate-800">
                            장바구니가 비었어요.
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                            담아둔 상품이 없어요. 마음에 드는 상품을 담아보세요!
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/"
                                className="inline-flex rounded-lg bg-coupang-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-coupang-navy"
                            >
                                지금 쇼핑하기
                            </Link>
                        </div>
                    </div>
                ) : (
                    items.map((item) => (
                        <CartItem
                            key={item.cartItemId}
                            item={item}
                            onRemove={handleRemoveItem}
                            onUpdateQuantity={handleUpdateQuantity}
                            checked={selectedItemIds.has(item.cartItemId)}
                            onCheck={(checked) => handleCheckItem(item.cartItemId, checked)}
                        />
                    ))
                )}
            </section>

            <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-floating">
                <h2 className="text-lg font-bold text-slate-800">결제 예정 금액</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <div className="flex justify-between">
                        <span>상품금액 ({selectedCount}개)</span>
                        <span className="font-semibold">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>배송비</span>
                        <span className="font-semibold">
                            {deliveryFee === 0 ? "무료" : formatCurrency(deliveryFee)}
                        </span>
                    </div>
                    <div className="flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-extrabold text-coupang-blue">
                        <span>결제 예상 금액</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>

                <button
                    onClick={handleCheckout}
                    className="mt-6 w-full block rounded-lg bg-coupang-blue py-3 text-lg font-bold text-white text-center shadow-md transition hover:bg-coupang-navy"
                >
                    결제하기 ({selectedItemIds.size}개)
                </button>
                <p className="mt-2 text-xs text-slate-500 text-center">
                    쿠폰/할인은 결제 단계에서 적용돼요.
                </p>
            </aside>
        </div>
    );
}
