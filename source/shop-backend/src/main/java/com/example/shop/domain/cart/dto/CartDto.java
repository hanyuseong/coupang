package com.example.shop.domain.cart.dto;

import com.example.shop.domain.cart.entity.Cart;
import java.util.List;
import java.util.stream.Collectors;

public class CartDto {
    private List<CartItemDto> cartItems;
    private int totalAmount;
    private int deliveryFee;

    public CartDto() {
    }

    public CartDto(List<CartItemDto> cartItems, int totalAmount, int deliveryFee) {
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
        this.deliveryFee = deliveryFee;
    }

    public CartDto(Cart cart) {
        // TODO: Convert Cart entity to CartDto
        // this.cartItems = cart.getCartItems().stream()
        //         .map(item -> new CartItemDto(item))
        //         .collect(Collectors.toList());
        // this.totalAmount = calculateTotalAmount(cart);
        // this.deliveryFee = calculateDeliveryFee(cart);
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
