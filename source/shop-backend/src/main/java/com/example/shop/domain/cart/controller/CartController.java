package com.example.shop.domain.cart.controller;

import com.example.shop.global.common.ApiResponse;
import com.example.shop.domain.cart.dto.CartDto;
import com.example.shop.domain.cart.dto.CartAddRequest;
import com.example.shop.domain.cart.dto.CartUpdateRequest;
import com.example.shop.domain.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final com.example.shop.domain.member.repository.MemberRepository memberRepository;

    @Autowired
    public CartController(CartService cartService,
            com.example.shop.domain.member.repository.MemberRepository memberRepository) {
        this.cartService = cartService;
        this.memberRepository = memberRepository;
    }

    private Long getMemberId(Object principal) {
        if (principal == null || "anonymousUser".equals(principal)) {
            throw new com.example.shop.global.exception.BusinessException(
                    com.example.shop.global.exception.ErrorCode.UNAUTHORIZED);
        }
        String email = (String) principal;
        return memberRepository.findByEmail(email)
                .map(com.example.shop.domain.member.entity.Member::getMemberId)
                .orElseThrow(() -> new com.example.shop.global.exception.BusinessException(
                        com.example.shop.global.exception.ErrorCode.MEMBER_NOT_FOUND));
    }

    @GetMapping
    public ApiResponse<CartDto> getCart(@AuthenticationPrincipal Object principal) {
        if (principal == null || "anonymousUser".equals(principal)) {
            return ApiResponse.ok(new CartDto());
        }
        Long memberId = getMemberId(principal);
        CartDto cart = cartService.getCart(memberId);
        return ApiResponse.ok(cart);
    }

    @PostMapping
    public ApiResponse<String> addToCart(@AuthenticationPrincipal Object principal,
            @RequestBody CartAddRequest req) {
        Long memberId = getMemberId(principal);
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
