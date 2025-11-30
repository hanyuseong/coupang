import { CategorySidebar } from "@/components/category-sidebar";
import { FooterLinks } from "@/components/footer-links";
import { SiteHeader } from "@/components/site-header";
import { fetchCart, fetchCategories, fetchPromotion, fetchRecommendedKeywords } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function PromotionPage({
    params,
}: {
    params: { id: string };
}) {
    const promotionId = parseInt(params.id);
    if (isNaN(promotionId)) {
        notFound();
    }

    const [categories, cart, promotion, recommendedKeywords] = await Promise.all([
        fetchCategories(),
        fetchCart(),
        fetchPromotion(promotionId),
        fetchRecommendedKeywords(),
    ]);

    if (!promotion) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-coupang-gray">
            <SiteHeader
                suggestionKeywords={[]}
                recommendedKeywords={recommendedKeywords}
                cartCount={cart.cartItems?.length ?? 0}
            />
            <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    <CategorySidebar categories={categories} />
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-sm min-h-[500px]">
                        <h1 className="text-2xl font-bold mb-6 border-b pb-4">{promotion.title}</h1>

                        {promotion.bannerImage && (
                            <div className="mb-8 flex justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={promotion.bannerImage}
                                    alt={promotion.title}
                                    className="max-w-full h-auto"
                                />
                            </div>
                        )}

                        <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: promotion.description }} />
                        </div>
                    </div>
                </div>
            </main>
            <FooterLinks />
        </div>
    );
}
