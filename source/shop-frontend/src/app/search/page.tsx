import { FooterLinks } from "@/components/footer-links";
import { ProductGrid } from "@/components/product-grid";
import { SearchTabs } from "@/components/search-tabs";
import { SiteHeader } from "@/components/site-header";
import {
    fetchCart,
    fetchProducts,
    fetchRecommendedKeywords,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { keyword?: string };
}) {
    const keyword = searchParams.keyword ?? "";

    const [products, recommendedKeywords, cart] = await Promise.all([
        fetchProducts({ keyword }),
        fetchRecommendedKeywords(),
        fetchCart(),
    ]);

    return (
        <div className="min-h-screen bg-coupang-gray">
            <SiteHeader
                suggestionKeywords={products.map((p) => p.name)}
                recommendedKeywords={recommendedKeywords}
                cartCount={cart.cartItems?.length ?? 0}
            />
            <SearchTabs />
            <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
                <ProductGrid
                    title={`'${keyword}' 검색 결과`}
                    subtitle={`${products.length}개의 상품이 검색되었습니다.`}
                    products={products}
                />
            </main>
            <FooterLinks />
        </div>
    );
}
