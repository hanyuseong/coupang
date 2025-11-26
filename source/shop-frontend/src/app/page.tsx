import { CategoryMenu } from "@/components/category-menu";
import { CartSummary } from "@/components/cart-summary";
import { DealRail } from "@/components/deal-rail";
import { FooterLinks } from "@/components/footer-links";
import { OrderStatus } from "@/components/order-status";
import { ProductGrid } from "@/components/product-grid";
import { PromoBanner } from "@/components/promo-banner";
import { ReviewHighlight } from "@/components/review-highlight";
import { SiteHeader } from "@/components/site-header";
import {
  fetchCart,
  fetchCategories,
  fetchOrders,
  fetchProducts,
  fetchReviews,
  fetchRecommendedKeywords,
  fetchLightningDeals,
  fetchRecentReviews,
} from "@/lib/api";
import { splitProducts } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { keyword?: string };
}) {
  const [categories, products, recommendedKeywords, lightningDeals, recentReviews] = await Promise.all([
    fetchCategories(),
    fetchProducts({ keyword: searchParams.keyword }),
    fetchRecommendedKeywords(),
    fetchLightningDeals(),
    fetchRecentReviews(),
  ]);

  const productGroups = splitProducts(products);

  const [cart, orders, reviews] = await Promise.all([
    fetchCart(),
    fetchOrders(),
    fetchReviews(
      productGroups.highlighted?.productId ?? products[0]?.productId,
    ),
  ]);

  return (
    <div className="min-h-screen bg-coupang-gray">
      <SiteHeader
        suggestionKeywords={products.map((p) => p.name)}
        recommendedKeywords={recommendedKeywords}
        cartCount={cart.cartItems?.length ?? 0}
        isLoggedIn={true}
        userName="홍길동"
      />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
        <PromoBanner product={productGroups.highlighted} />
        <CategoryMenu categories={categories} />

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <ProductGrid
              title="오늘의 로켓 추천"
              subtitle="회원이 가장 많이 찾은 상품 TOP6"
              products={productGroups.featured}
              initialVisibleCount={6}
            />
            <DealRail products={lightningDeals} />
          </div>
          <div className="space-y-6">
            <CartSummary cart={cart} />
            <OrderStatus orders={orders} />
            <ReviewHighlight reviews={recentReviews} />
          </div>
        </div>

        <ProductGrid
          title="로켓프레시 EXPRESS"
          subtitle="오늘 밤 12시 전 주문하면 새벽 7시 도착"
          products={productGroups.express}
          initialVisibleCount={3}
        />
      </main>
      <FooterLinks />
    </div>
  );
}
