export interface Promotion {
    id: number;
    title: string;
    description: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
}

export interface PromotionFormData {
    title: string;
    description: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
}
