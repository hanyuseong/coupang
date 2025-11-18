package com.example.shop.domain.cart.dto;

import java.util.List;

public class CartDto {
    private List<CartItemDto> cartItems;
    private int totalAmount;
    private int deliveryFee;

    public CartDto(List<CartItemDto> cartItems, int totalAmount, int deliveryFee) {
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
        this.deliveryFee = deliveryFee;
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
