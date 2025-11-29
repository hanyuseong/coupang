import api from '@/lib/axios';
import { Order } from '@/types/order';

export const getOrders = async (): Promise<Order[]> => {
    const response = await api.get('/admin/orders');
    return response.data;
};
