"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Promotion, PromotionFormData } from "@/types/promotion";

interface PromotionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    promotion?: Promotion | null;
    onSubmit: (data: PromotionFormData) => Promise<void>;
}

export function PromotionDialog({
    open,
    onOpenChange,
    promotion,
    onSubmit,
}: PromotionDialogProps) {
    const [formData, setFormData] = useState<PromotionFormData>({
        title: "",
        description: "",
        bannerImage: "",
        startDate: "",
        endDate: "",
        isActive: true,
    });

    useEffect(() => {
        if (promotion) {
            setFormData({
                title: promotion.title,
                description: promotion.description || "",
                bannerImage: promotion.bannerImage || "",
                startDate: promotion.startDate ? promotion.startDate.split("T")[0] : "",
                endDate: promotion.endDate ? promotion.endDate.split("T")[0] : "",
                isActive: promotion.isActive,
            });
        } else {
            setFormData({
                title: "",
                description: "",
                bannerImage: "",
                startDate: "",
                endDate: "",
                isActive: true,
            });
        }
    }, [promotion, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 날짜 포맷팅 (YYYY-MM-DD -> YYYY-MM-DDT00:00:00)
        const formattedData = {
            ...formData,
            startDate: formData.startDate ? `${formData.startDate}T00:00:00` : "",
            endDate: formData.endDate ? `${formData.endDate}T23:59:59` : ""
        };
        await onSubmit(formattedData);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {promotion ? "기획전 수정" : "기획전 등록"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">기획전명</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">설명</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bannerImage">배너 이미지 URL</Label>
                        <Input
                            id="bannerImage"
                            value={formData.bannerImage}
                            onChange={(e) =>
                                setFormData({ ...formData, bannerImage: e.target.value })
                            }
                            placeholder="/banners/example.jpg"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">시작일</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, startDate: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">종료일</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, endDate: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isActive"
                            checked={formData.isActive}
                            onCheckedChange={(checked) =>
                                setFormData({ ...formData, isActive: checked as boolean })
                            }
                        />
                        <Label htmlFor="isActive">활성화</Label>
                    </div>
                    <DialogFooter>
                        <Button type="submit">저장</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
