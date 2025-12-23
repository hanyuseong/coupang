import Link from "next/link";
import { FooterLinks } from "@/components/footer-links";
import { SiteHeader } from "@/components/site-header";
import {
    fetchCartServer,
    fetchRecommendedKeywordsServer,
} from "@/lib/api-server";
import { CartContent } from "@/components/cart-content";

export default async function CartPage() {
    const [cart, recommendedKeywords] = await Promise.all([
        fetchCartServer(),
        fetchRecommendedKeywordsServer(),
    ]);

    const items = cart?.cartItems ?? [];
    const itemCount = items.length;

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

                <CartContent
                    initialCart={cart}
                    recommendedKeywords={recommendedKeywords}
                />
            </main>
            <FooterLinks />
        </div>
    );
}
