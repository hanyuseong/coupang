export interface DashboardStats {
    totalSales: number;
    totalOrders: number;
    totalMembers: number;
    todaySales: number;
    todayOrders: number;
    recentOrders: any[]; // We'll define a proper type later or reuse Order type
    dailySales: { date: string; amount: number }[];
}
