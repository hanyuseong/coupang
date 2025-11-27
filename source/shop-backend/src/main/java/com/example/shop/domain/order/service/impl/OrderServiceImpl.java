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
    private final com.example.shop.domain.product.repository.ProductRepository productRepository;

    @Override
    @Transactional
    public OrderDto placeOrder(OrderDto orderDto) {
        // 주문 생성 (Member는 null로 설정 - mockup 용도)
        Order order = Order.builder()
                .member(null) // Member를 null로 설정
                .orderStatus(com.example.shop.domain.order.enums.OrderStatus.PENDING) // 기본 상태 설정
                .totalAmount(orderDto.getTotalAmount())
                .deliveryFee(orderDto.getDeliveryFee())
                .build();

        if (orderDto.getItems() != null && !orderDto.getItems().isEmpty()) {
            List<com.example.shop.domain.order.entity.OrderItem> orderItems = orderDto.getItems().stream()
                    .map(itemDto -> {
                        com.example.shop.domain.product.entity.Product product = productRepository
                                .findById(itemDto.getProductId())
                                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));

                        com.example.shop.domain.order.entity.OrderItem orderItem = new com.example.shop.domain.order.entity.OrderItem();
                        orderItem.setOrder(order);
                        orderItem.setProduct(product);
                        orderItem.setQuantity(itemDto.getQuantity());
                        orderItem.setPrice(itemDto.getPrice());
                        orderItem.setDiscountPrice(0);
                        return orderItem;
                    })
                    .collect(Collectors.toList());
            order.setOrderItems(orderItems);
        }

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
        List<com.example.shop.domain.order.dto.OrderItemDto> items = order.getOrderItems() != null
                ? order.getOrderItems().stream()
                        .map(item -> com.example.shop.domain.order.dto.OrderItemDto.builder()
                                .orderItemId(item.getOrderItemId())
                                .productId(item.getProduct().getProductId())
                                .productName(item.getProduct().getName())
                                .quantity(item.getQuantity())
                                .price(item.getPrice())
                                .discountPrice(item.getDiscountPrice())
                                .build())
                        .collect(Collectors.toList())
                : null;

        return OrderDto.builder()
                .orderId(order.getOrderId())
                .memberId(order.getMember() != null ? order.getMember().getMemberId() : null)
                .items(items)
                .totalAmount(order.getTotalAmount())
                .deliveryFee(order.getDeliveryFee())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }
}
