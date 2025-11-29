"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/order";

interface OrderTableProps {
    orders: Order[];
    isLoading: boolean;
}

export function OrderTable({ orders, isLoading }: OrderTableProps) {
    const getStatusBadge = (status: string) => {
        const statusMap: { [key: string]: { label: string; className: string } } = {
            PENDING: { label: "결제 대기", className: "bg-yellow-100 text-yellow-800" },
            PAID: { label: "결제 완료", className: "bg-blue-100 text-blue-800" },
            PREPARING: { label: "배송 준비", className: "bg-indigo-100 text-indigo-800" },
            SHIPPING: { label: "배송 중", className: "bg-purple-100 text-purple-800" },
            DELIVERED: { label: "배송 완료", className: "bg-green-100 text-green-800" },
            CANCELED: { label: "취소됨", className: "bg-red-100 text-red-800" },
        };
        const statusInfo = statusMap[status] || { label: status, className: "bg-gray-100 text-gray-800" };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                {statusInfo.label}
            </span>
        );
    };

    if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>주문번호</TableHead>
                        <TableHead>주문자</TableHead>
                        <TableHead>주문 내역</TableHead>
                        <TableHead>결제 금액</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>주문 일시</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow key={order.orderId}>
                            <TableCell>{order.orderId}</TableCell>
                            <TableCell>
                                <div>{order.memberName}</div>
                                <div className="text-xs text-gray-500">{order.memberEmail}</div>
                            </TableCell>
                            <TableCell>{order.summary}</TableCell>
                            <TableCell>{order.totalAmount.toLocaleString()}원</TableCell>
                            <TableCell>{getStatusBadge(order.orderStatus)}</TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                    {orders?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center h-24">
                                주문 내역이 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
