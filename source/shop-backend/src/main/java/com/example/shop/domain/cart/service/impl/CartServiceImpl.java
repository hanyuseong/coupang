package com.example.shop.domain.cart.service.impl;

import com.example.shop.domain.cart.dto.CartDto;
import com.example.shop.domain.cart.dto.CartAddRequest;
import com.example.shop.domain.cart.dto.CartUpdateRequest;
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
        Cart cart = cartRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_NOT_FOUND));
        return new CartDto(cart);
    }

    @Override
    public void addToCart(Long memberId, CartAddRequest request) {
        Cart cart = cartRepository.findByMember_MemberId(memberId)
                .orElseGet(() -> createCart(memberId));
        // TODO: Implement cart item creation from request
        // CartItem cartItem = createCartItemFromRequest(request);
        // cart.addCartItem(cartItem);
        cartRepository.save(cart);
    }

    private Cart createCart(Long memberId) {
        Cart cart = new Cart();
        // TODO: Set member properly
        // cart.setMember(member);
        return cartRepository.save(cart);
    }

    @Override
    public void updateCartItem(Long cartItemId, CartUpdateRequest request) {
        // TODO: Find cart item and update quantity
        // CartItem cartItem = cartItemRepository.findById(cartItemId)
        //         .orElseThrow(() -> new BusinessException(ErrorCode.CART_ITEM_NOT_FOUND));
        // cartItem.setQuantity(request.getQuantity());
        // cartItemRepository.save(cartItem);
    }

    @Override
    public void removeCartItem(Long cartItemId) {
        // TODO: Find cart item and remove
        // CartItem cartItem = cartItemRepository.findById(cartItemId)
        //         .orElseThrow(() -> new BusinessException(ErrorCode.CART_ITEM_NOT_FOUND));
        // cartItemRepository.delete(cartItem);
    }
}
