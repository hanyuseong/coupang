import Link from "next/link";
import { FooterLinks } from "@/components/footer-links";
import { SiteHeader } from "@/components/site-header";
import { fetchCart, fetchRecommendedKeywords } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CartPage() {
    const [cart, recommendedKeywords] = await Promise.all([
        fetchCart(),
        fetchRecommendedKeywords(),
    ]);

    const items = cart.cartItems ?? [];
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal =
        cart.totalAmount ??
        items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = cart.deliveryFee ?? 0;
    const total = subtotal + deliveryFee;

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
                                <div
                                    key={item.cartItemId}
                                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <p className="text-xs font-semibold text-coupang-blue">
                                                상품번호 {item.productId}
                                            </p>
                                            <p className="text-lg font-bold text-slate-800">
                                                {item.productName}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                수량 {item.quantity}개 · 단가 {formatCurrency(item.price)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-extrabold text-coupang-blue">
                                                {formatCurrency(item.price * item.quantity)}
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
                            ))
                        )}
                    </section>

                    <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-floating">
                        <h2 className="text-lg font-bold text-slate-800">결제 예정 금액</h2>
                        <div className="mt-4 space-y-3 text-sm text-slate-700">
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
                                <span>결제 예상 금액</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <button className="mt-6 w-full rounded-lg bg-coupang-blue py-3 text-lg font-bold text-white shadow-md transition hover:bg-coupang-navy">
                            결제하기
                        </button>
                        <p className="mt-2 text-xs text-slate-500">
                            쿠폰/할인은 결제 단계에서 적용돼요.
                        </p>
                    </aside>
                </div>
            </main>
            <FooterLinks />
        </div>
    );
}
