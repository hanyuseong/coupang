"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type HeroBannerProps = {
    title?: string;
    subtitle?: string;
};

export function HeroBanner({
    title = "Hans Shop 특가 세일",
    subtitle = "최대 70% 할인 + 무료배송"
}: HeroBannerProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "🎉 신규회원 특별 혜택",
            subtitle: "지금 가입하고 10% 쿠폰 받기",
            bg: "from-purple-600 via-purple-700 to-indigo-800"
        },
        {
            title: "⚡ 오늘만 특가",
            subtitle: "인기 상품 최대 70% 할인",
            bg: "from-orange-500 via-red-600 to-pink-700"
        },
        {
            title: "🚀 무료배송",
            subtitle: "전 상품 무료배송 + 당일배송",
            bg: "from-blue-600 via-cyan-600 to-teal-700"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className={`w-full h-full bg-gradient-to-br ${slide.bg} flex flex-col items-center justify-center text-white p-8`}>
                        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
                            {slide.title}
                        </h1>
                        <p className="text-2xl font-semibold mb-8 drop-shadow-md">
                            {slide.subtitle}
                        </p>
                        <button className="bg-white text-coupang-blue px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                            자세히 보기 →
                        </button>
                    </div>
                </div>
            ))}

            {/* Slide indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? "bg-white w-8"
                                : "bg-white/50 hover:bg-white/75"
                            }`}
                        aria-label={`슬라이드 ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
