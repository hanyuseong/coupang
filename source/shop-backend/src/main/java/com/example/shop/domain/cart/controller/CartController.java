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

    private Long getMemberIdOrNull(Object principal) {
        if (principal == null || "anonymousUser".equals(principal)) {
            return null;
        }
        String email = (String) principal;
        return memberRepository.findByEmail(email)
                .map(com.example.shop.domain.member.entity.Member::getMemberId)
                .orElse(null);
    }

    @GetMapping
    public ApiResponse<CartDto> getCart(@AuthenticationPrincipal Object principal,
            @RequestHeader(value = "X-Cart-Session-Id", required = false) String sessionId) {
        Long memberId = getMemberIdOrNull(principal);
        CartDto cart = cartService.getCart(memberId, sessionId);
        return ApiResponse.ok(cart);
    }

    @PostMapping
    public ApiResponse<String> addToCart(@AuthenticationPrincipal Object principal,
            @RequestHeader(value = "X-Cart-Session-Id", required = false) String sessionId,
            @RequestBody CartAddRequest req) {
        Long memberId = getMemberIdOrNull(principal);
        cartService.addToCart(memberId, sessionId, req);
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
