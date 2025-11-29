export type AdminRole = 'USER' | 'ADMIN' | 'MANAGER';

export interface AdminUser {
    adminId: number;
    email: string;
    password?: string; // Optional for updates
    role: AdminRole;
    createdAt?: string;
}
