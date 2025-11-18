package com.example.shop.domain.cart.service.impl;

import com.example.shop.domain.cart.dto.CartDto;
import com.example.shop.domain.cart.entity.Cart;
import com.example.shop.domain.cart.entity.CartItem;
import com.example.shop.domain.cart.repository.CartRepository;
import com.example.shop.domain.cart.service.CartService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public CartDto getCart(Long memberId) {
        Cart cart = cartRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_NOT_FOUND));
        return new CartDto(cart);
    }

    @Override
    public void addToCart(Long memberId, CartItem cartItem) {
        Cart cart = cartRepository.findByMemberId(memberId)
                .orElseGet(() -> createCart(memberId));
        cart.addItem(cartItem);
        cartRepository.save(cart);
    }

    private Cart createCart(Long memberId) {
        Cart cart = new Cart();
        cart.setMemberId(memberId);
        return cartRepository.save(cart);
    }

    @Override
    public void updateCartItem(Long memberId, Long cartItemId, int quantity) {
        Cart cart = cartRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_NOT_FOUND));
        CartItem cartItem = cart.getCartItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_ITEM_NOT_FOUND));
        cartItem.setQuantity(quantity);
        cartRepository.save(cart);
    }

    @Override
    public void removeCartItem(Long memberId, Long cartItemId) {
        Cart cart = cartRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_NOT_FOUND));
        cart.removeItem(cartItemId);
        cartRepository.save(cart);
    }
}