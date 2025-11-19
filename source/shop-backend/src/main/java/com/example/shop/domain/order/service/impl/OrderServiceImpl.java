package com.example.shop.domain.order.service.impl;

import com.example.shop.domain.member.entity.Member;
import com.example.shop.domain.order.dto.OrderDto;
import com.example.shop.domain.order.entity.Order;
import com.example.shop.domain.order.repository.OrderRepository;
import com.example.shop.domain.order.service.OrderService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public OrderDto placeOrder(OrderDto orderDto) {
        Order order = Order.builder()
                .member(orderDto.getMemberId() != null ? Member.builder().memberId(orderDto.getMemberId()).build() : null)
                .totalAmount(orderDto.getTotalAmount())
                .deliveryFee(orderDto.getDeliveryFee())
                .build();

        Order savedOrder = orderRepository.save(order);
        return convertToDto(savedOrder);
    }

    @Override
    public OrderDto getOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ORDER_NOT_FOUND));
        return convertToDto(order);
    }

    @Override
    public List<OrderDto> getOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private OrderDto convertToDto(Order order) {
        return OrderDto.builder()
                .orderId(order.getOrderId())
                .memberId(order.getMember() != null ? order.getMember().getMemberId() : null)
                .totalAmount(order.getTotalAmount())
                .deliveryFee(order.getDeliveryFee())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }
}
