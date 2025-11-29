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
import { Promotion } from "@/types/promotion";
import { Edit, Trash2 } from "lucide-react";

interface PromotionTableProps {
    promotions: Promotion[];
    isLoading: boolean;
    onEdit: (promotion: Promotion) => void;
    onDelete: (id: number) => void;
}

export function PromotionTable({
    promotions,
    isLoading,
    onEdit,
    onDelete,
}: PromotionTableProps) {
    if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>기획전명</TableHead>
                        <TableHead>기간</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {promotions?.map((promotion) => (
                        <TableRow key={promotion.id}>
                            <TableCell>{promotion.id}</TableCell>
                            <TableCell>
                                <div className="font-medium">{promotion.title}</div>
                                <div className="text-xs text-gray-500 truncate max-w-[300px]">
                                    {promotion.description}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm">
                                    {promotion.startDate ? new Date(promotion.startDate).toLocaleDateString() : "-"} ~{" "}
                                    {promotion.endDate ? new Date(promotion.endDate).toLocaleDateString() : "-"}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${promotion.isActive
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {promotion.isActive ? "진행중" : "종료"}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(promotion)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => {
                                            if (confirm("정말 삭제하시겠습니까?")) {
                                                onDelete(promotion.id);
                                            }
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {promotions?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">
                                등록된 기획전이 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
