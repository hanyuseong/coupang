package com.example.shop.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardDto {
    private long totalSales;
    private long totalOrders;
    private long totalMembers;
    private long todaySales;
    private long todayOrders;
    private java.util.List<AdminOrderDto> recentOrders;
    private java.util.List<DailySalesDto> dailySales;
}
