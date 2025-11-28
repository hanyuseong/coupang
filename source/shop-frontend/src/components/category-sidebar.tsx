import Link from "next/link";
import { Category } from "@/lib/types";

type CategorySidebarProps = {
    categories: Category[];
};

export function CategorySidebar({ categories }: CategorySidebarProps) {
    return (
        <aside className="w-full lg:w-60 bg-white rounded-2xl shadow-md overflow-hidden h-[400px] flex flex-col">
            <div className="bg-gradient-to-r from-coupang-blue to-coupang-navy p-4 shrink-0">
                <h2 className="text-lg font-bold text-white">전체 카테고리</h2>
            </div>
            <nav className="py-1 flex-1 flex flex-col justify-center">
                {categories.slice(0, 7).map((category) => (
                    <Link
                        key={category.categoryId}
                        href={`/products?categoryId=${category.categoryId}`}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-coupang-blue/5 hover:text-coupang-blue border-b border-slate-100 last:border-0"
                    >
                        <div className="flex size-8 items-center justify-center rounded-lg bg-coupang-blue/10 text-coupang-blue text-xs font-bold">
                            {category.name.slice(0, 2)}
                        </div>
                        <span>{category.name}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
