package com.example.shop.domain.order.controller;

import com.example.shop.global.common.ApiResponse;
import com.example.shop.domain.order.dto.OrderDto;
import com.example.shop.domain.order.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto>> placeOrder(@Valid @RequestBody OrderDto orderDto) {
        OrderDto createdOrder = orderService.placeOrder(orderDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(createdOrder));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderDto>> getOrder(@PathVariable Long orderId) {
        OrderDto order = orderService.getOrder(orderId);
        return ResponseEntity.ok(ApiResponse.ok(order));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDto>>> getOrders() {
        List<OrderDto> orders = orderService.getOrders();
        return ResponseEntity.ok(ApiResponse.ok(orders));
    }
}
