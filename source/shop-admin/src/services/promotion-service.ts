import { Promotion, PromotionFormData } from "@/types/promotion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const promotionService = {
    async getAllPromotions(): Promise<Promotion[]> {
        const response = await fetch(`${API_URL}/api/admin/promotions`);
        if (!response.ok) throw new Error("Failed to fetch promotions");
        return response.json();
    },

    async getPromotion(id: number): Promise<Promotion> {
        const response = await fetch(`${API_URL}/api/admin/promotions/${id}`);
        if (!response.ok) throw new Error("Failed to fetch promotion");
        return response.json();
    },

    async createPromotion(data: PromotionFormData): Promise<Promotion> {
        const response = await fetch(`${API_URL}/api/admin/promotions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to create promotion");
        return response.json();
    },

    async updatePromotion(id: number, data: PromotionFormData): Promise<Promotion> {
        const response = await fetch(`${API_URL}/api/admin/promotions/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to update promotion");
        return response.json();
    },

    async deletePromotion(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/api/admin/promotions/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete promotion");
    },
};
