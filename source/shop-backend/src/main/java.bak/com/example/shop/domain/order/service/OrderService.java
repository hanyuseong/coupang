package com.example.shop.domain.order.service;

import com.example.shop.domain.order.dto.OrderDto;
import com.example.shop.domain.order.dto.OrderCreateRequest;

public interface OrderService {
    OrderDto placeOrder(OrderCreateRequest request, Long memberId);
    OrderDto getOrder(Long orderId);
}
