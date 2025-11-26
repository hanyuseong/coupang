import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { FooterLinks } from "@/components/footer-links";
import { fetchCart, fetchProduct, fetchRecommendedKeywords } from "@/lib/api";
import { calcDiscountPercent, formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
    params,
}: {
    params: { productId: string };
}) {
    const productId = parseInt(params.productId);
    if (isNaN(productId)) notFound();

    const [product, cart, recommendedKeywords] = await Promise.all([
        fetchProduct(productId),
        fetchCart(),
        fetchRecommendedKeywords(),
    ]);

    if (!product) notFound();

    const discount = calcDiscountPercent(product.price, product.discountPrice);

    return (
        <div className="min-h-screen bg-white">
            <SiteHeader
                cartCount={cart.cartItems?.length ?? 0}
                suggestionKeywords={[]}
                recommendedKeywords={recommendedKeywords}
            />

            <main className="mx-auto max-w-6xl px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Image Section */}
                    <div className="sticky top-24 h-fit">
                        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-100 bg-coupang-gray">
                            {product.thumbnail ? (
                                <Image
                                    src={product.thumbnail}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-slate-400">
                                    이미지 준비중
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col">
                        <div className="border-b border-slate-100 pb-6">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-sm font-medium text-coupang-blue">
                                    {product.brand}
                                </span>
                                <span className="text-xs text-slate-400">상품번호: {product.productId}</span>
                            </div>
                            <h1 className="text-2xl font-medium text-slate-800 lg:text-3xl">
                                {product.name}
                            </h1>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex text-coupang-blue">
                                    {"★".repeat(Math.floor(product.rating ?? 0))}
                                    {"☆".repeat(5 - Math.floor(product.rating ?? 0))}
                                </div>
                                <span className="text-sm text-coupang-blue underline">
                                    {product.reviewCount?.toLocaleString()}개 상품평
                                </span>
                            </div>
                        </div>

                        <div className="border-b border-slate-100 py-6">
                            <div className="flex items-baseline gap-3">
                                {product.discountPrice && (
                                    <span className="text-3xl font-light text-slate-400 line-through">
                                        {formatCurrency(product.price)}
                                    </span>
                                )}
                                <span className="text-4xl font-bold text-coupang-red">
                                    {formatCurrency(product.discountPrice ?? product.price)}
                                </span>
                                {discount && (
                                    <span className="text-2xl text-slate-500">
                                        {discount}% 할인
                                    </span>
                                )}
                            </div>

                            {product.deliveryType?.toLowerCase().includes("rocket") && (
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="rounded-full bg-coupang-blue px-3 py-1 text-sm font-bold text-white">
                                        ROCKET
                                    </span>
                                    <span className="text-sm font-bold text-green-600">
                                        내일(화) 새벽 7시 전 도착 보장
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="py-6">
                            <div className="flex items-center justify-between border-b border-slate-100 py-4">
                                <span className="font-bold text-slate-600">배송비</span>
                                <span className="font-bold text-slate-800">무료배송</span>
                            </div>

                            {/* Quantity Selector Placeholder */}
                            <div className="flex items-center justify-between py-4">
                                <span className="font-bold text-slate-600">수량</span>
                                <div className="flex items-center rounded border border-slate-300">
                                    <button className="px-3 py-1 text-slate-500 hover:bg-slate-100">-</button>
                                    <span className="px-3 py-1 font-bold text-slate-800">1</span>
                                    <button className="px-3 py-1 text-slate-500 hover:bg-slate-100">+</button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto flex gap-3 pt-6 lg:sticky lg:bottom-0 lg:bg-white lg:pb-0">
                            <button className="flex-1 rounded-md border border-coupang-blue bg-white py-4 text-lg font-bold text-coupang-blue transition hover:bg-blue-50">
                                장바구니 담기
                            </button>
                            <button className="flex-1 rounded-md bg-coupang-blue py-4 text-lg font-bold text-white shadow-md transition hover:bg-blue-600">
                                바로구매
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Details Content Placeholder */}
                <div className="mt-16 border-t border-slate-200 pt-16">
                    <h2 className="mb-8 text-xl font-bold text-slate-800">상품 상세 정보</h2>
                    <div className="aspect-[3/4] w-full max-w-3xl mx-auto bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                        상품 상세 이미지가 여기에 표시됩니다.
                    </div>
                </div>
            </main>
            <FooterLinks />
        </div>
    );
}
