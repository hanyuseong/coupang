"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchCart, createOrder } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { Cart } from "@/lib/types";

type PaymentMethod = "card" | "transfer" | "phone" | "naverpay" | "kakaopay" | "toss";

export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("card");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        async function loadCart() {
            try {
                const cartData = await fetchCart();
                setCart(cartData);
            } catch (error) {
                console.error("Failed to load cart", error);
            } finally {
                setLoading(false);
            }
        }
        loadCart();
    }, []);

    const handlePayment = async () => {
        setIsProcessing(true);

        try {
            // 주문 데이터 준비
            const orderData = {
                items: items.map(item => ({
                    productId: item.productId,
                    productName: item.productName,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: subtotal,
                deliveryFee: deliveryFee
            };

            console.log('Creating order with data:', orderData);

            // 주문 생성 API 호출
            const result = await createOrder(orderData);

            console.log('Order creation result:', result);

            if (result.success && result.orderId) {
                // 주문 성공 시 완료 페이지로 이동
                router.push(`/order-complete/${result.orderId}`);
            } else {
                // 주문 실패 처리
                alert("주문 생성에 실패했습니다. 다시 시도해주세요.");
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert("결제 처리 중 오류가 발생했습니다.");
            setIsProcessing(false);
        }
    };

    const getPaymentMethodName = (method: PaymentMethod): string => {
        const names: Record<PaymentMethod, string> = {
            card: "신용/체크카드",
            transfer: "실시간 계좌이체",
            phone: "휴대폰 결제",
            naverpay: "네이버페이",
            kakaopay: "카카오페이",
            toss: "토스페이"
        };
        return names[method];
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-coupang-gray">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-coupang-blue border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-slate-500">결제 정보를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    const items = cart?.cartItems ?? [];
    const subtotal = cart?.totalAmount ?? 0;
    const deliveryFee = cart?.deliveryFee ?? 0;
    const total = subtotal + deliveryFee;

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-coupang-gray">
                <div className="text-center">
                    <p className="text-lg font-bold text-slate-800">장바구니가 비어있습니다.</p>
                    <Link href="/" className="mt-4 inline-block text-coupang-blue hover:underline">
                        쇼핑 계속하기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-coupang-gray">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="mx-auto max-w-6xl px-4 py-4">
                    <Link href="/" className="text-2xl font-extrabold text-coupang-blue">
                        Coupang
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-8">
                <h1 className="text-2xl font-bold text-slate-800 mb-6">주문/결제</h1>

                <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                    {/* 주문 상품 정보 */}
                    <div className="space-y-6">
                        {/* 주문 상품 */}
                        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">주문 상품</h2>
                            <div className="space-y-3">
                                {items.map((item) => (
                                    <div key={item.cartItemId} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                                        <div>
                                            <p className="font-semibold text-slate-800">{item.productName}</p>
                                            <p className="text-sm text-slate-500">수량: {item.quantity}개</p>
                                        </div>
                                        <p className="font-bold text-coupang-blue">
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 결제 수단 선택 */}
                        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">결제 수단</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {(["card", "transfer", "phone", "naverpay", "kakaopay", "toss"] as PaymentMethod[]).map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setSelectedPayment(method)}
                                        className={`p-4 rounded-lg border-2 transition ${selectedPayment === method
                                            ? "border-coupang-blue bg-blue-50 text-coupang-blue"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            {method === "card" && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            )}
                                            {method === "transfer" && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                </svg>
                                            )}
                                            {method === "phone" && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {(method === "naverpay" || method === "kakaopay" || method === "toss") && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            )}
                                            <span className="font-semibold text-sm">
                                                {getPaymentMethodName(method)}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* 결제 금액 */}
                    <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-floating sticky top-4">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">결제 금액</h2>
                        <div className="space-y-3 text-sm text-slate-700">
                            <div className="flex justify-between">
                                <span>상품금액</span>
                                <span className="font-semibold">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>배송비</span>
                                <span className="font-semibold">
                                    {deliveryFee === 0 ? "무료" : formatCurrency(deliveryFee)}
                                </span>
                            </div>
                            <div className="flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-extrabold text-coupang-blue">
                                <span>최종 결제 금액</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-slate-600">
                                <span className="font-semibold text-coupang-blue">선택한 결제 수단:</span>
                                <br />
                                {getPaymentMethodName(selectedPayment)}
                            </p>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="mt-6 w-full rounded-lg bg-coupang-blue py-4 text-lg font-bold text-white shadow-md transition hover:bg-coupang-navy disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    결제 처리 중...
                                </span>
                            ) : (
                                `${formatCurrency(total)} 결제하기`
                            )}
                        </button>

                        <p className="mt-3 text-xs text-center text-slate-500">
                            이 결제는 Mockup입니다. 실제 결제가 진행되지 않습니다.
                        </p>
                    </aside>
                </div>
            </main>
        </div>
    );
}
