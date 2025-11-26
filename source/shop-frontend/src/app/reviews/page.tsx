import { FooterLinks } from "@/components/footer-links";
import { SiteHeader } from "@/components/site-header";
import {
    fetchAllReviews,
    fetchCart,
    fetchProducts,
    fetchRecommendedKeywords,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
    const [reviews, cart, products, recommendedKeywords] = await Promise.all([
        fetchAllReviews(),
        fetchCart(),
        fetchProducts(),
        fetchRecommendedKeywords(),
    ]);

    return (
        <div className="min-h-screen bg-coupang-gray">
            <SiteHeader
                suggestionKeywords={products.map((p) => p.name)}
                recommendedKeywords={recommendedKeywords}
                cartCount={cart.cartItems?.length ?? 0}
            />
            <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
                <section className="rounded-3xl bg-white p-6 shadow-floating">
                    <h1 className="mb-6 text-2xl font-bold">구매자 생생 후기</h1>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {reviews.map((review) => (
                            <article
                                key={review.reviewId}
                                className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm"
                            >
                                <div className="flex items-center gap-1 text-coupang-blue">
                                    {"★".repeat(review.rating).padEnd(5, "☆")}
                                </div>
                                <p className="mt-2 line-clamp-3 text-slate-700">
                                    {review.content}
                                </p>
                                <div className="mt-auto pt-3 text-xs text-slate-400">
                                    {new Date(review.createdAt ?? Date.now()).toLocaleString(
                                        "ko-KR",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
            <FooterLinks />
        </div>
    );
}
