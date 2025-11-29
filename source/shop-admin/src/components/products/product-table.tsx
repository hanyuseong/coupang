"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Product } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/services/product-service";

interface ProductTableProps {
    products: Product[];
    isLoading: boolean;
    onEdit: (product: Product) => void;
}

export function ProductTable({ products, isLoading, onEdit }: ProductTableProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const handleDelete = (id: number) => {
        if (confirm("정말 이 상품을 삭제하시겠습니까?")) {
            deleteMutation.mutate(id);
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            ACTIVE: { label: "판매중", className: "bg-green-100 text-green-800" },
            INACTIVE: { label: "품절", className: "bg-gray-100 text-gray-800" },
            DELETED: { label: "삭제됨", className: "bg-red-100 text-red-800" },
        };
        const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.ACTIVE;
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
                        <TableHead>ID</TableHead>
                        <TableHead>이미지</TableHead>
                        <TableHead>상품명</TableHead>
                        <TableHead>브랜드</TableHead>
                        <TableHead>가격</TableHead>
                        <TableHead>재고</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.map((product) => (
                        <TableRow key={product.productId}>
                            <TableCell>{product.productId}</TableCell>
                            <TableCell>
                                {product.images && product.images.length > 0 ? (
                                    <div className="w-12 h-12 relative rounded overflow-hidden border">
                                        <img
                                            src={`http://localhost:8080${product.images[0].imageUrl}`}
                                            alt={product.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                                        No Img
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.brand || "-"}</TableCell>
                            <TableCell>
                                {product.discountPrice ? (
                                    <div>
                                        <span className="line-through text-gray-400 text-sm">
                                            {product.price.toLocaleString()}원
                                        </span>
                                        <br />
                                        <span className="text-red-600 font-bold">
                                            {product.discountPrice.toLocaleString()}원
                                        </span>
                                    </div>
                                ) : (
                                    <span>{product.price.toLocaleString()}원</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <span className={product.stock > 0 ? "" : "text-red-500 font-bold"}>
                                    {product.stock}
                                </span>
                            </TableCell>
                            <TableCell>{getStatusBadge(product.status)}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDelete(product.productId)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {products?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center h-24">
                                등록된 상품이 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
