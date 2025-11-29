import api from '@/lib/axios';
import { AdminUser } from '@/types/admin-user';

export const getAdminUsers = async (): Promise<AdminUser[]> => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const createAdminUser = async (user: Omit<AdminUser, 'adminId' | 'createdAt'>): Promise<AdminUser> => {
    const response = await api.post('/admin/users', user);
    return response.data;
};

export const updateAdminUser = async (id: number, user: Partial<AdminUser>): Promise<AdminUser> => {
    const response = await api.put(`/admin/users/${id}`, user);
    return response.data;
};

export const deleteAdminUser = async (id: number): Promise<void> => {
    await api.delete(`/admin/users/${id}`);
};
