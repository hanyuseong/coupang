package com.example.shop.domain.admin.service;

import com.example.shop.domain.admin.dto.AdminDashboardDto;
import com.example.shop.domain.admin.dto.AdminOrderDto;
import com.example.shop.domain.admin.dto.DailySalesDto;
import com.example.shop.domain.order.entity.Order;
import com.example.shop.domain.member.repository.MemberRepository;
import com.example.shop.domain.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminDashboardService {

    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;

    public AdminDashboardDto getDashboardStats() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();

        long totalSales = orderRepository.sumTotalSales();
        long totalOrders = orderRepository.count();
        long totalMembers = memberRepository.count();
        long todaySales = orderRepository.sumTodaySales(startOfDay);
        long todayOrders = orderRepository.countByCreatedAtAfter(startOfDay);

        // Recent Orders
        List<AdminOrderDto> recentOrders = orderRepository.findTop5ByOrderByCreatedAtDesc().stream()
                .map(this::convertToOrderDto)
                .collect(Collectors.toList());

        // Daily Sales (Last 7 days)
        LocalDateTime sevenDaysAgo = LocalDate.now().minusDays(6).atStartOfDay();
        List<Order> lastWeekOrders = orderRepository.findAllByCreatedAtAfter(sevenDaysAgo);

        Map<String, Long> salesMap = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd");

        // Initialize map with 0 for last 7 days
        for (int i = 0; i < 7; i++) {
            LocalDate date = LocalDate.now().minusDays(i);
            salesMap.put(date.format(formatter), 0L);
        }

        // Aggregate sales
        for (Order order : lastWeekOrders) {
            String dateKey = order.getCreatedAt().format(formatter);
            salesMap.put(dateKey, salesMap.getOrDefault(dateKey, 0L) + order.getTotalAmount());
        }

        List<DailySalesDto> dailySales = salesMap.entrySet().stream()
                .map(entry -> new DailySalesDto(entry.getKey(), entry.getValue()))
                .sorted(Comparator.comparing(DailySalesDto::getDate))
                .collect(Collectors.toList());

        return AdminDashboardDto.builder()
                .totalSales(totalSales)
                .totalOrders(totalOrders)
                .totalMembers(totalMembers)
                .todaySales(todaySales)
                .todayOrders(todayOrders)
                .recentOrders(recentOrders)
                .dailySales(dailySales)
                .build();
    }

    private AdminOrderDto convertToOrderDto(Order order) {
        String summary = order.getOrderItems().stream()
                .map(item -> item.getProduct().getName() + " x " + item.getQuantity())
                .collect(Collectors.joining(", "));

        if (summary.length() > 50) {
            summary = summary.substring(0, 47) + "...";
        }

        return AdminOrderDto.builder()
                .orderId(order.getOrderId())
                .memberId(order.getMember() != null ? order.getMember().getMemberId() : null)
                .memberName(order.getMember() != null ? order.getMember().getName() : "Guest")
                .memberEmail(order.getMember() != null ? order.getMember().getEmail() : null)
                .orderStatus(order.getOrderStatus())
                .totalAmount(order.getTotalAmount())
                .deliveryFee(order.getDeliveryFee())
                .createdAt(order.getCreatedAt())
                .summary(summary)
                .build();
    }
}
