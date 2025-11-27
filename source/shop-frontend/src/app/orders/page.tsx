"use client";

import { useEffect, useState } from "react";
import { fetchOrders } from "@/lib/api";
import { Order } from "@/lib/types";
import Link from "next/link";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadOrders() {
            try {
                const data = await fetchOrders();
                // 최신 주문이 위로 오도록 정렬 (orderId 기준 내림차순)
                const sortedOrders = data.sort((a, b) => b.orderId - a.orderId);
                setOrders(sortedOrders);
            } catch (error) {
                console.error("Failed to load orders", error);
            } finally {
                setLoading(false);
            }
        }
        loadOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-coupang-blue"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="mb-4 text-xl text-gray-600">주문 내역이 없습니다.</p>
                    <Link
                        href="/"
                        className="inline-block rounded bg-coupang-blue px-6 py-3 font-bold text-white transition hover:bg-blue-600"
                    >
                        쇼핑하러 가기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="mx-auto max-w-5xl px-4">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">주문목록</h1>
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.orderId} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                            {/* 주문 헤더 */}
                            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-lg font-bold text-gray-900">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "날짜 없음"} 주문
                                    </span>
                                    <span className="text-sm text-gray-500">주문번호 {order.orderId}</span>
                                </div>
                                <Link
                                    href={`/order-complete/${order.orderId}`}
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    주문상세보기 &gt;
                                </Link>
                            </div>

                            {/* 주문 아이템 목록 */}
                            <div className="p-6">
                                <div className="space-y-6">
                                    {order.items && order.items.length > 0 ? (
                                        order.items.map((item) => (
                                            <div key={item.orderItemId} className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                                {/* 상품 이미지 (Placeholder) */}
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-100">
                                                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                        No Image
                                                    </div>
                                                </div>

                                                {/* 상품 정보 */}
                                                <div className="flex-1">
                                                    <h3 className="text-base font-medium text-gray-900">
                                                        <Link href={`/products/${item.productId}`} className="hover:underline">
                                                            {item.productName}
                                                        </Link>
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.price.toLocaleString()}원 / {item.quantity}개
                                                    </p>
                                                    <div className="mt-2">
                                                        <span className="font-bold text-green-600">
                                                            {/* 도착 예정일 시뮬레이션 */}
                                                            {new Date() < new Date(new Date().setDate(new Date().getDate() + 1))
                                                                ? "내일(수) 도착 보장"
                                                                : "모레 도착 예정"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* 버튼 그룹 */}
                                                <div className="flex flex-col gap-2 sm:w-32">
                                                    <button className="w-full rounded border border-coupang-blue bg-coupang-blue px-3 py-2 text-sm font-bold text-white hover:bg-blue-600">
                                                        배송조회
                                                    </button>
                                                    <button className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                        교환/반품 신청
                                                    </button>
                                                    <button className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                        리뷰 작성
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-4 text-center text-gray-500">
                                            주문 상품 정보가 없습니다.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 주문 요약 */}
                            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 text-right">
                                <span className="text-sm text-gray-600">총 결제금액: </span>
                                <span className="ml-2 text-xl font-bold text-gray-900">
                                    {order.totalAmount.toLocaleString()}원
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
