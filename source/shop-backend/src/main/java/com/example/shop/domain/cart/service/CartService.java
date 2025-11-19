package com.example.shop.domain.cart.service;

import com.example.shop.domain.cart.dto.CartDto;
import com.example.shop.domain.cart.dto.CartAddRequest;
import com.example.shop.domain.cart.dto.CartUpdateRequest;

public interface CartService {
    CartDto getCart(Long memberId);
    void addToCart(Long memberId, CartAddRequest request);
    void updateCartItem(Long cartItemId, CartUpdateRequest request);
    void removeCartItem(Long cartItemId);
}
