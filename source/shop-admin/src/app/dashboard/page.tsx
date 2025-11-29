"use client";

import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/admin-layout";
import { getDashboardStats } from "@/services/dashboard-service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";

export default function DashboardPage() {
    const { data: stats, isLoading } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: getDashboardStats,
    });

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="p-8">로딩 중...</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold">대시보드</h1>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">총 매출</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats?.totalSales.toLocaleString()}원
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +{stats?.todaySales.toLocaleString()}원 (오늘)
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">총 주문수</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.totalOrders}건</div>
                            <p className="text-xs text-muted-foreground">
                                +{stats?.todayOrders}건 (오늘)
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">총 회원수</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.totalMembers}명</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">오늘 매출</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats?.todaySales.toLocaleString()}원
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>매출 현황</CardTitle>
                            <CardDescription>
                                최근 7일간의 매출 추이입니다.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview data={stats?.dailySales || []} />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>최근 주문</CardTitle>
                            <CardDescription>
                                최근 5건의 주문 내역입니다.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentSales orders={stats?.recentOrders || []} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
