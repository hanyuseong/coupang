package com.example.shop.domain.order.service.impl;

import com.example.shop.domain.order.dto.OrderDto;
import com.example.shop.domain.order.entity.Order;
import com.example.shop.domain.order.repository.OrderRepository;
import com.example.shop.domain.order.service.OrderService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public OrderDto placeOrder(OrderDto orderDto) {
        Order order = new Order();
        // Set order properties from orderDto
        // Example: order.setMember(member);
        // order.setTotalAmount(orderDto.getTotalAmount());
        // Add additional properties as needed

        Order savedOrder = orderRepository.save(order);
        return convertToDto(savedOrder);
    }

    @Override
    public OrderDto getOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ORDER_NOT_FOUND));
        return convertToDto(order);
    }

    private OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        // Map order properties to dto
        // Example: dto.setOrderId(order.getOrderId());
        // Add additional properties as needed
        return dto;
    }
}
