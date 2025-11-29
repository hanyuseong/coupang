"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { PromotionTable } from "@/components/promotions/promotion-table";
import { PromotionDialog } from "@/components/promotions/promotion-dialog";
import { promotionService } from "@/services/promotion-service";
import { Promotion, PromotionFormData } from "@/types/promotion";
import { useToast } from "@/components/ui/use-toast";

export default function PromotionsPage() {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
        null
    );
    const { toast } = useToast();

    const fetchPromotions = async () => {
        try {
            setIsLoading(true);
            const data = await promotionService.getAllPromotions();
            setPromotions(data);
        } catch (error) {
            toast({
                title: "오류 발생",
                description: "기획전 목록을 불러오는데 실패했습니다.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    const handleCreate = () => {
        setSelectedPromotion(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (promotion: Promotion) => {
        setSelectedPromotion(promotion);
        setIsDialogOpen(true);
    };

    const handleSubmit = async (data: PromotionFormData) => {
        try {
            if (selectedPromotion) {
                await promotionService.updatePromotion(selectedPromotion.id, data);
                toast({ title: "수정 완료", description: "기획전이 수정되었습니다." });
            } else {
                await promotionService.createPromotion(data);
                toast({ title: "등록 완료", description: "새 기획전이 등록되었습니다." });
            }
            fetchPromotions();
        } catch (error) {
            toast({
                title: "오류 발생",
                description: "작업을 처리하는 중 오류가 발생했습니다.",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await promotionService.deletePromotion(id);
            toast({ title: "삭제 완료", description: "기획전이 삭제되었습니다." });
            fetchPromotions();
        } catch (error) {
            toast({
                title: "오류 발생",
                description: "삭제 중 오류가 발생했습니다.",
                variant: "destructive",
            });
        }
    };

    return (
        <AdminLayout>
            <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">기획전 관리</h2>
                        <p className="text-muted-foreground">
                            진행 중인 기획전과 이벤트를 관리합니다.
                        </p>
                    </div>
                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-4 w-4" /> 기획전 등록
                    </Button>
                </div>

                <PromotionTable
                    promotions={promotions}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <PromotionDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    promotion={selectedPromotion}
                    onSubmit={handleSubmit}
                />
            </div>
        </AdminLayout>
    );
}
