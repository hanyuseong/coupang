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
import { Category } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/services/category-service";

interface CategoryTableProps {
    categories: Category[];
    isLoading: boolean;
    onEdit: (category: Category) => void;
}

export function CategoryTable({ categories, isLoading, onEdit }: CategoryTableProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const handleDelete = (id: number) => {
        if (confirm("정말 이 카테고리를 삭제하시겠습니까?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>카테고리명</TableHead>
                        <TableHead>Depth</TableHead>
                        <TableHead>부모 ID</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories?.map((category) => (
                        <TableRow key={category.categoryId}>
                            <TableCell>{category.categoryId}</TableCell>
                            <TableCell className="font-medium">
                                <span style={{ paddingLeft: `${category.depth * 20}px` }}>
                                    {category.depth > 0 && "└ "}
                                    {category.name}
                                </span>
                            </TableCell>
                            <TableCell>{category.depth}</TableCell>
                            <TableCell>{category.parentId || "-"}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDelete(category.categoryId)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {categories?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">
                                등록된 카테고리가 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
