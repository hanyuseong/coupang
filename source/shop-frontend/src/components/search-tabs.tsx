"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function SearchTabs() {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("keyword") ?? "";

    const tabs = [
        { name: "전체", id: "all" },
        { name: "상품", id: "products" },
        { name: "카테고리", id: "categories" },
        { name: "고객센터", id: "help" },
    ];

    return (
        <div className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl gap-8 px-4">
                {tabs.map((tab) => (
                    <Link
                        key={tab.id}
                        href={`/search?keyword=${encodeURIComponent(keyword)}&tab=${tab.id}`}
                        className={`border-b-2 py-3 text-sm font-bold ${(searchParams.get("tab") ?? "all") === tab.id
                                ? "border-coupang-blue text-coupang-blue"
                                : "border-transparent text-slate-600 hover:text-coupang-blue"
                            }`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
