import api from '@/lib/axios';
import { Member } from '@/types/member';

export const getMembers = async (): Promise<Member[]> => {
    const response = await api.get('/admin/members');
    return response.data;
};
