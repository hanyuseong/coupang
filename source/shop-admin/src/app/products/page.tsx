"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductTable } from "@/components/products/product-table";
import { ProductDialog } from "@/components/products/product-dialog";
import { getProducts } from "@/services/product-service";
import { Product } from "@/types/product";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function ProductsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const selectedProduct = selectedProductId
        ? products?.find(p => p.productId === selectedProductId) || null
        : null;

    const handleCreateProduct = () => {
        setSelectedProductId(null);
        setIsDialogOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProductId(product.productId);
        setIsDialogOpen(true);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">상품 관리</h1>
                    <Button onClick={handleCreateProduct}>
                        <Plus className="mr-2 h-4 w-4" /> 상품 등록
                    </Button>
                </div>

                <ProductTable
                    products={products || []}
                    isLoading={isLoading}
                    onEdit={handleEditProduct}
                />

                <ProductDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    product={selectedProduct}
                />
            </div>
        </AdminLayout>
    );
}
