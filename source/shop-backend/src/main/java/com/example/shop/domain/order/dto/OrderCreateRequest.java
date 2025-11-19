package com.example.shop.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderCreateRequest {
    private List<OrderItemRequest> items;
    private Long deliveryAddressId;
    private int deliveryFee;
}

