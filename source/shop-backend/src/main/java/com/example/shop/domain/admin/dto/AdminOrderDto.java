package com.example.shop.domain.admin.dto;

import com.example.shop.domain.order.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminOrderDto {
    private Long orderId;
    private Long memberId;
    private String memberName;
    private String memberEmail;
    private OrderStatus orderStatus;
    private int totalAmount;
    private int deliveryFee;
    private LocalDateTime createdAt;
    private String summary; // e.g., "Nike Shoes x 1, Adidas Socks x 2"
}
