"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
            image: "/banners/banner_electronics_new.png",
            alt: "Electronics Sale",
            title: "디지털 가전 특가",
            subtitle: "최신 노트북/스마트폰 최대 30% 할인",
            link: "/exhibitions/digital-electronics"
        },
        {
            image: "/banners/banner_fashion_new.png",
            alt: "Fashion Sale",
            title: "S/S 패션 위크",
            subtitle: "트렌디한 봄 신상 아이템",
            link: "/exhibitions/summer-fashion"
        },
        {
            image: "/banners/banner_fresh_person.png",
            alt: "Fresh Food",
            title: "로켓프레시",
            subtitle: "신선한 식재료 새벽 도착",
            link: "/exhibitions/rocket-fresh"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg animate-fade-in">
                            {slide.title}
                        </h1>
                        <p className="text-xl font-semibold mb-6 drop-shadow-md">
                            {slide.subtitle}
                        </p>
                        <Link href={slide.link || "#"}>
                            <button className="w-fit bg-white text-coupang-blue px-6 py-3 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-lg">
                                자세히 보기 →
                            </button>
                        </Link>
                    </div>
                </div>
            ))}

            {/* Slide indicators */}
            <div className="absolute bottom-6 right-8 flex gap-2">
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
