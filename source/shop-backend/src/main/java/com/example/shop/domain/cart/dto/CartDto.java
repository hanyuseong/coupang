package com.example.shop.domain.cart.dto;

import com.example.shop.domain.cart.entity.Cart;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class CartDto {
    private List<CartItemDto> cartItems;
    private int totalAmount;
    private int deliveryFee;

    public CartDto() {
        this.cartItems = Collections.emptyList();
        this.totalAmount = 0;
        this.deliveryFee = 0;
    }

    public CartDto(List<CartItemDto> cartItems, int totalAmount, int deliveryFee) {
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
        this.deliveryFee = deliveryFee;
    }

    public CartDto(Cart cart) {
        if (cart == null || cart.getCartItems() == null) {
            this.cartItems = Collections.emptyList();
            this.totalAmount = 0;
            this.deliveryFee = 0;
            return;
        }

        this.cartItems = cart.getCartItems().stream()
                .map(item -> CartItemDto.builder()
                        .cartItemId(item.getCartItemId())
                        .productId(item.getProduct().getProductId())
                        .productName(item.getProduct().getName())
                        .optionStockId(item.getOptionStock() != null ? item.getOptionStock().getOptionStockId() : null)
                        .quantity(item.getQuantity())
                        .price(item.getPrice() != null ? item.getPrice() : item.getProduct().getPrice())
                        .createdAt(item.getCreatedAt() != null ? item.getCreatedAt().toString() : null)
                        .build())
                .collect(Collectors.toList());

        this.totalAmount = cartItems.stream()
                .filter(item -> item.getPrice() != null && item.getQuantity() != null)
                .mapToInt(item -> item.getPrice() * item.getQuantity())
                .sum();

        this.deliveryFee = calculateDeliveryFee(this.totalAmount);
    }

    private int calculateDeliveryFee(int totalAmount) {
        // Basic rule: free shipping over 30,000
        return totalAmount >= 30000 ? 0 : 3000;
    }

    public List<CartItemDto> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemDto> cartItems) {
        this.cartItems = cartItems;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(int deliveryFee) {
        this.deliveryFee = deliveryFee;
    }
}
