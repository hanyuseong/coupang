package com.example.shop.domain.admin.service;

import com.example.shop.domain.admin.dto.AdminOrderDto;
import com.example.shop.domain.order.entity.Order;
import com.example.shop.domain.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminOrderService {

    private final OrderRepository orderRepository;

    public List<AdminOrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private AdminOrderDto convertToDto(Order order) {
        String summary = order.getOrderItems().stream()
                .map(item -> item.getProduct().getName() + " x " + item.getQuantity())
                .collect(Collectors.joining(", "));

        // Truncate summary if too long
        if (summary.length() > 50) {
            summary = summary.substring(0, 47) + "...";
        }

        return AdminOrderDto.builder()
                .orderId(order.getOrderId())
                .memberId(order.getMember() != null ? order.getMember().getMemberId() : null)
                .memberName(order.getMember() != null ? order.getMember().getName() : "Guest") // Assuming Guest or null
                                                                                               // member
                .memberEmail(order.getMember() != null ? order.getMember().getEmail() : null)
                .orderStatus(order.getOrderStatus())
                .totalAmount(order.getTotalAmount())
                .deliveryFee(order.getDeliveryFee())
                .createdAt(order.getCreatedAt())
                .summary(summary)
                .build();
    }
}
