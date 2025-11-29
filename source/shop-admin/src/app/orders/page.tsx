"use client";

import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/admin-layout";
import { OrderTable } from "@/components/orders/order-table";
import { getOrders } from "@/services/order-service";

export default function OrdersPage() {
    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">주문/배송 관리</h1>
                </div>

                <OrderTable
                    orders={orders || []}
                    isLoading={isLoading}
                />
            </div>
        </AdminLayout>
    );
}
