import api from '@/lib/axios';
import { Category } from '@/types/category';

export { type Category };

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get('/admin/categories');
    return response.data;
};

export const createCategory = async (category: Partial<Category>): Promise<Category> => {
    const response = await api.post('/admin/categories', category);
    return response.data;
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category> => {
    const response = await api.put(`/admin/categories/${id}`, category);
    return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
    await api.delete(`/admin/categories/${id}`);
};
