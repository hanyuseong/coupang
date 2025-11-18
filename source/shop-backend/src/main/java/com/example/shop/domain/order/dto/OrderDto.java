package com.example.shop.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {
    private Long orderId;
    private Long memberId;
    private List<OrderItemDto> items;
    private int totalAmount;
    private int deliveryFee;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}