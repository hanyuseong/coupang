import api from '@/lib/axios';
import { DashboardStats } from '@/types/dashboard';

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
};
