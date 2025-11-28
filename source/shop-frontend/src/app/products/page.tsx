import { SiteHeader } from "@/components/site-header";
import { FooterLinks } from "@/components/footer-links";
import { ProductCard } from "@/components/product-card";
import { CategorySidebar } from "@/components/category-sidebar";
import {
    fetchProducts,
    fetchCategories,
    fetchCart,
    fetchRecommendedKeywords,
} from "@/lib/api";

export const dynamic = "force-dynamic";

type ProductsPageProps = {
    searchParams: {
        categoryId?: string;
        keyword?: string;
        minPrice?: string;
        maxPrice?: string;
        page?: string;
    };
};

export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    const categoryId = searchParams.categoryId
        ? parseInt(searchParams.categoryId)
        : undefined;
    const minPrice = searchParams.minPrice
        ? parseInt(searchParams.minPrice)
        : undefined;
    const maxPrice = searchParams.maxPrice
        ? parseInt(searchParams.maxPrice)
        : undefined;
    const page = searchParams.page ? parseInt(searchParams.page) - 1 : 0;

    const [products, categories, cart, recommendedKeywords] = await Promise.all([
        fetchProducts({
            categoryId,
            keyword: searchParams.keyword,
            minPrice,
            maxPrice,
            page,
            size: 20,
        }),
        fetchCategories(),
        fetchCart(),
        fetchRecommendedKeywords(),
    ]);

    const selectedCategory = categoryId
        ? categories.find((c) => c.categoryId === categoryId)
        : null;

    return (
        <div className="min-h-screen bg-coupang-gray">
            <SiteHeader
                suggestionKeywords={products.map((p) => p.name)}
                recommendedKeywords={recommendedKeywords}
                cartCount={cart.cartItems?.length ?? 0}
            />
            <main className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
                {/* Sidebar */}
                <CategorySidebar categories={categories} />

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Header */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <h1 className="text-2xl font-bold text-slate-800">
                            {selectedCategory
                                ? selectedCategory.name
                                : searchParams.keyword
                                    ? `"${searchParams.keyword}" 검색 결과`
                                    : "전체 상품"}
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            총 {products.length}개의 상품이 있습니다
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="rounded-2xl bg-white p-4 shadow-md">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-semibold text-slate-700">
                                정렬:
                            </span>
                            <button className="rounded-lg bg-coupang-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-coupang-navy">
                                인기순
                            </button>
                            <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                                낮은 가격순
                            </button>
                            <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                                높은 가격순
                            </button>
                            <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                                최신순
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.productId} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white p-12 text-center shadow-md">
                            <p className="text-lg text-slate-500">
                                검색 결과가 없습니다.
                            </p>
                            <p className="mt-2 text-sm text-slate-400">
                                다른 검색어로 다시 시도해보세요.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {products.length > 0 && (
                        <div className="flex justify-center gap-2">
                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50">
                                이전
                            </button>
                            <button className="rounded-lg bg-coupang-blue px-4 py-2 text-sm font-medium text-white shadow-sm">
                                1
                            </button>
                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                                2
                            </button>
                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                                3
                            </button>
                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                                다음
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <FooterLinks />
        </div>
    );
}
