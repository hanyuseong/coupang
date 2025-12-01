package com.example.shop.domain.order.service;

import com.example.shop.domain.order.dto.OrderDto;

import java.util.List;

public interface OrderService {
    OrderDto placeOrder(OrderDto orderDto, String email);

    OrderDto getOrder(Long orderId);

    List<OrderDto> getOrders();
}
