"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function ProductSort() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "productId,desc";

    const sortOptions = [
        { label: "인기순", value: "productId,desc" },
        { label: "낮은 가격순", value: "price,asc" },
        { label: "높은 가격순", value: "price,desc" },
        { label: "최신순", value: "createdAt,desc" },
    ];

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        // Reset page when sorting changes
        params.delete("page");
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">정렬:</span>
            {sortOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${currentSort === option.value
                            ? "bg-coupang-blue text-white hover:bg-coupang-navy"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
