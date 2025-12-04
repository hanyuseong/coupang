"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FooterLinks } from "@/components/footer-links";
import { SiteHeader } from "@/components/site-header";
import { fetchCart, fetchRecommendedKeywords, removeCartItem, updateCartItemQuantity } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { CartItem } from "@/components/cart-item";
import { Cart } from "@/lib/types";

export default function CartPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [recommendedKeywords, setRecommendedKeywords] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        async function loadData() {
            try {
                const [cartData, keywordsData] = await Promise.all([
                    fetchCart(),
                    fetchRecommendedKeywords(),
                ]);
                setCart(cartData);
                setRecommendedKeywords(keywordsData);

                // 초기 로드 시 모든 아이템 선택
                if (cartData?.cartItems) {
                    const allIds = new Set(cartData.cartItems.map(item => item.cartItemId));
                    setSelectedItemIds(allIds);
                }
            } catch (error) {
                console.error("Failed to load cart data", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleRemoveItem = async (cartItemId: number) => {
        try {
            const success = await removeCartItem(cartItemId);
            if (success) {
                const updatedCart = await fetchCart();
                setCart(updatedCart);
                // 삭제된 아이템은 선택 목록에서도 제거
                setSelectedItemIds(prev => {
                    const next = new Set(prev);
                    next.delete(cartItemId);
                    return next;
                });
            } else {
                console.error('Delete failed: success is false');
                alert("삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error('Error in handleRemoveItem:', error);
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
                console.error('Update quantity failed: success is false');
                alert("수량 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error('Error in handleUpdateQuantity:', error);
            alert("수량 변경 중 오류가 발생했습니다.");
        }
    };

    const handleCheckItem = (cartItemId: number, checked: boolean) => {
        setSelectedItemIds(prev => {
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
            const allIds = new Set(cart.cartItems.map(item => item.cartItemId));
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

        // 선택된 아이템 ID들을 로컬 스토리지에 저장
        localStorage.setItem("checkout_selected_items", JSON.stringify(Array.from(selectedItemIds)));

        // 선택된 아이템의 상세 정보(productId, optionStockId) 저장 (로그인 시 병합 후 매칭을 위해)
        if (cart?.cartItems) {
            const selectedProducts = cart.cartItems
                .filter(item => selectedItemIds.has(item.cartItemId))
                .map(item => ({
                    productId: item.productId,
                    optionStockId: item.optionStockId
                }));
            localStorage.setItem("checkout_selected_products", JSON.stringify(selectedProducts));
        }

        // 로그인 여부 확인
        const token = localStorage.getItem("accessToken");
        if (!token) {
            // 로그인되어 있지 않으면 로그인 페이지로 이동 (redirect 파라미터 포함)
            window.location.href = "/login?redirect=/checkout";
        } else {
            // 로그인되어 있으면 결제 페이지로 이동
            window.location.href = "/checkout";
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-coupang-gray">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-coupang-blue border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-slate-500">장바구니를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    const items = cart?.cartItems ?? [];
    const itemCount = items.length;

    // 선택된 아이템만 계산
    const selectedItems = items.filter(item => selectedItemIds.has(item.cartItemId));
    const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = cart?.deliveryFee ?? 0; // 배송비 로직은 복잡할 수 있으니 일단 전체 기준 유지하거나, 필요시 수정 (여기서는 단순 유지)
    const total = subtotal + deliveryFee;

    const isAllSelected = items.length > 0 && selectedItemIds.size === items.length;

    return (
        <div className="min-h-screen bg-coupang-gray">
            <SiteHeader
                suggestionKeywords={items.map((item) => item.productName)}
                recommendedKeywords={recommendedKeywords}
                cartCount={items.length}
            />

            <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-coupang-blue">장바구니</p>
                        <h1 className="text-2xl font-bold text-slate-800">
                            담은 상품 {itemCount}개
                        </h1>
                        <p className="text-sm text-slate-500">
                            로켓상품은 밤 11시 전 결제 시 내일 새벽 도착해요.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="rounded-full border border-coupang-blue px-4 py-2 text-sm font-semibold text-coupang-blue transition hover:bg-white"
                    >
                        쇼핑 계속하기
                    </Link>
                </div>

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
                                <label htmlFor="check-all" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                                    전체선택 ({selectedItemIds.size}/{items.length})
                                </label>
                            </div>
                        )}

                        {items.length === 0 ? (
                            <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
                                <p className="text-lg font-bold text-slate-800">장바구니가 비었어요.</p>
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
            </main>
            <FooterLinks />
        </div>
    );
}
