"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryTable } from "@/components/categories/category-table";
import { CategoryDialog } from "@/components/categories/category-dialog";
import { getCategories, Category } from "@/services/category-service";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function CategoriesPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const selectedCategory = selectedCategoryId
        ? categories?.find(c => c.categoryId === selectedCategoryId) || null
        : null;

    const handleCreateCategory = () => {
        setSelectedCategoryId(null);
        setIsDialogOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setSelectedCategoryId(category.categoryId);
        setIsDialogOpen(true);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">카테고리 관리</h1>
                    <Button onClick={handleCreateCategory}>
                        <Plus className="mr-2 h-4 w-4" /> 카테고리 등록
                    </Button>
                </div>

                <CategoryTable
                    categories={categories || []}
                    isLoading={isLoading}
                    onEdit={handleEditCategory}
                />

                <CategoryDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    category={selectedCategory}
                />
            </div>
        </AdminLayout>
    );
}
