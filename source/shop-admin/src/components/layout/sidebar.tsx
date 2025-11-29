"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    Megaphone,
    MessageSquare,
    Settings,
} from "lucide-react";

const menuItems = [
    {
        title: "대시보드",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "회원 관리",
        href: "/members",
        icon: Users,
    },
    {
        title: "카테고리 관리",
        href: "/categories",
        icon: Package, // Using Package icon for now, or maybe ListTree if available? Let's stick to Package or similar.
    },
    {
        title: "상품 관리",
        href: "/products",
        icon: Package,
    },
    {
        title: "주문/배송 관리",
        href: "/orders",
        icon: ShoppingCart,
    },
    {
        title: "프로모션/마케팅",
        href: "/promotions",
        icon: Megaphone,
    },
    {
        title: "고객 응대",
        href: "/cs",
        icon: MessageSquare,
    },
    {
        title: "설정",
        href: "/users",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-slate-50">
            <div className="flex h-16 items-center border-b px-6">
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-700 hover:bg-slate-200"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
