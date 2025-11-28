"use client";

import { fetchProducts, fetchCart, fetchRecommendedKeywords } from "@/lib/api";
import { ProductGrid } from "@/components/product-grid";
import { SiteHeader } from "@/components/site-header";
import { FooterLinks } from "@/components/footer-links";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product, Cart } from "@/lib/types";

export default function DigitalElectronicsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Cart>({ cartItems: [], totalAmount: 0, deliveryFee: 0 });
    const [recommendedKeywords, setRecommendedKeywords] = useState<string[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const [productsData, cartData, keywordsData] = await Promise.all([
                fetchProducts({ keyword: "가전" }),
                fetchCart(),
                fetchRecommendedKeywords(),
            ]);
            setProducts(productsData);
            setCart(cartData);
            setRecommendedKeywords(keywordsData);
        };
        loadData();
    }, []);

    const scrollToProducts = () => {
        const productsSection = document.getElementById("products-section");
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen bg-coupang-gray">
            <SiteHeader
                suggestionKeywords={products.map((p) => p.name)}
                recommendedKeywords={recommendedKeywords}
                cartCount={cart.cartItems?.length ?? 0}
            />
            <main className="mx-auto max-w-6xl px-4 py-8">
                <div className="mb-8 relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="/banners/banner_electronics_new.png"
                        alt="Digital Electronics Sale"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-12 text-white">
                        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
                            디지털 가전 특가
                        </h1>
                        <p className="text-2xl font-semibold mb-6 drop-shadow-md">
                            최신 노트북/스마트폰 최대 30% 할인
                        </p>
                        <button
                            onClick={scrollToProducts}
                            className="w-fit bg-white text-coupang-blue px-6 py-3 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-lg"
                        >
                            자세히 보기 →
                        </button>
                    </div>
                </div>

                <div id="products-section" className="bg-white p-6 rounded-xl shadow-sm">
                    <ProductGrid
                        title="디지털 가전 추천"
                        subtitle="오늘 해택을 더하다 - 최대 10% 할인"
                        products={products}
                        initialVisibleCount={100}
                    />
                </div>
            </main>
            <FooterLinks />
        </div>
    );
}
