package com.example.shop.domain.cart.service;

import com.example.shop.domain.cart.dto.CartDto;

public interface CartService {
    CartDto getCart(Long memberId);
    void addToCart(Long memberId, CartAddRequest request);
    void updateCartItem(Long cartItemId, int quantity);
    void removeCartItem(Long cartItemId);
}
