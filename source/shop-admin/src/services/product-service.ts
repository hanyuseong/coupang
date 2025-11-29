import api from '@/lib/axios';
import { Product } from '@/types/product';

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get('/admin/products');
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get(`/admin/products/${id}`);
    return response.data;
};

export const createProduct = async (product: Omit<Product, 'productId' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await api.post('/admin/products', product);
    return response.data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/admin/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/admin/products/${id}`);
};

export const uploadProductImage = async (productId: number, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
    await api.post(`/admin/products/${productId}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteProductImage = async (imageId: number): Promise<void> => {
    await api.delete(`/admin/products/images/${imageId}`);
};
