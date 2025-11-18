package com.example.shop.domain.cart.controller;

import com.example.shop.global.common.ApiResponse;
import com.example.shop.domain.cart.dto.CartDto;
import com.example.shop.domain.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ApiResponse<CartDto> getCart(@AuthenticationPrincipal Long memberId) {
        CartDto cart = cartService.getCart(memberId);
        return ApiResponse.ok(cart);
    }

    @PostMapping
    public ApiResponse<String> addToCart(@AuthenticationPrincipal Long memberId,
                                         @RequestBody CartAddRequest req) {
        cartService.addToCart(memberId, req);
        return ApiResponse.ok("Item added to cart successfully");
    }

    @PutMapping("/{cartItemId}")
    public ApiResponse<String> updateCartItem(@PathVariable Long cartItemId,
                                              @RequestBody CartUpdateRequest req) {
        cartService.updateCartItem(cartItemId, req);
        return ApiResponse.ok("Cart item updated successfully");
    }

    @DeleteMapping("/{cartItemId}")
    public ApiResponse<String> removeCartItem(@PathVariable Long cartItemId) {
        cartService.removeCartItem(cartItemId);
        return ApiResponse.ok("Cart item removed successfully");
    }
}