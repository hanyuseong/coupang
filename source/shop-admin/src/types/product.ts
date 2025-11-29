export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

export interface ProductImage {
    imageId: number;
    imageUrl: string;
    sortOrder: number;
}

export interface Product {
    productId: number;
    name: string;
    description?: string;
    brand?: string;
    price: number;
    discountPrice?: number;
    stock: number;
    status: ProductStatus;
    category?: {
        categoryId: number;
        name: string;
    };
    images?: ProductImage[];
    createdAt?: string;
    updatedAt?: string;
}
