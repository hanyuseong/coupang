package com.example.shop.domain.cart.service.impl;

import com.example.shop.domain.cart.dto.CartDto;
import com.example.shop.domain.cart.dto.CartAddRequest;
import com.example.shop.domain.cart.dto.CartUpdateRequest;
import com.example.shop.domain.cart.entity.Cart;
import com.example.shop.domain.member.entity.Member;
import com.example.shop.domain.member.repository.MemberRepository;
import com.example.shop.domain.product.entity.Product;
import com.example.shop.domain.product.entity.ProductOptionStock;
import com.example.shop.domain.product.repository.ProductRepository;
import com.example.shop.domain.product.repository.ProductOptionStockRepository;
import com.example.shop.domain.cart.entity.CartItem;
import com.example.shop.domain.cart.repository.CartItemRepository;
import com.example.shop.domain.cart.repository.CartRepository;
import com.example.shop.domain.cart.service.CartService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final ProductOptionStockRepository productOptionStockRepository;

    public CartServiceImpl(CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            MemberRepository memberRepository,
            ProductRepository productRepository,
            ProductOptionStockRepository productOptionStockRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.memberRepository = memberRepository;
        this.productRepository = productRepository;
        this.productOptionStockRepository = productOptionStockRepository;
    }

    @Override
    public CartDto getCart(Long memberId, String sessionId) {
        Cart cart = findCartOrCreate(memberId, sessionId);
        return new CartDto(cart);
    }

    @Override
    public void addToCart(Long memberId, String sessionId, CartAddRequest request) {
        Cart cart = findCartOrCreate(memberId, sessionId);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));

        final ProductOptionStock optionStock;
        if (request.getOptionStockId() != null) {
            ProductOptionStock tempOptionStock = productOptionStockRepository.findById(request.getOptionStockId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
            if (!tempOptionStock.getProduct().getProductId().equals(product.getProductId())) {
                throw new BusinessException(ErrorCode.PRODUCT_NOT_FOUND);
            }
            optionStock = tempOptionStock;
        } else {
            optionStock = null;
        }

        int quantityToAdd = request.getQuantity() != null && request.getQuantity() > 0
                ? request.getQuantity()
                : 1;

        CartItem existing = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getProductId().equals(product.getProductId()))
                .filter(item -> {
                    if (optionStock == null) {
                        return item.getOptionStock() == null;
                    }
                    return item.getOptionStock() != null &&
                            item.getOptionStock().getOptionStockId().equals(optionStock.getOptionStockId());
                })
                .findFirst()
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + quantityToAdd);
            cartItemRepository.save(existing);
        } else {
            int unitPrice = optionStock != null
                    ? optionStock.getPrice()
                    : (product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getPrice());

            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .optionStock(optionStock)
                    .price(unitPrice)
                    .quantity(quantityToAdd)
                    .build();

            cart.addCartItem(newItem);
            cartItemRepository.save(newItem);
        }

        cartRepository.save(cart);
    }

    private Cart createMemberCart(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND));
        Cart cart = new Cart(member);
        return cartRepository.save(cart);
    }

    private Cart createSessionCart(String sessionId) {
        Cart cart = new Cart(sessionId);
        return cartRepository.save(cart);
    }

    private Cart findCartOrCreate(Long memberId, String sessionId) {
        if (memberId != null) {
            // 1. 회원 장바구니 조회 또는 생성
            Cart memberCart = cartRepository.findFirstByMember_MemberId(memberId)
                    .orElseGet(() -> createMemberCart(memberId));

            // 2. 세션 장바구니가 있다면 병합 (로그인 직후 시나리오)
            if (sessionId != null && !sessionId.isEmpty()) {
                cartRepository.findFirstBySessionId(sessionId).ifPresent(sessionCart -> {
                    mergeCarts(memberCart, sessionCart);
                    cartRepository.delete(sessionCart); // 병합 후 세션 장바구니 삭제
                    cartRepository.save(memberCart);
                });
            }
            return memberCart;
        } else if (sessionId != null && !sessionId.isEmpty()) {
            // 3. 비회원: 세션 장바구니 조회 또는 생성
            return cartRepository.findFirstBySessionId(sessionId)
                    .orElseGet(() -> createSessionCart(sessionId));
        } else {
            throw new BusinessException(ErrorCode.BAD_REQUEST); // 둘 다 없으면 에러
        }
    }

    private void mergeCarts(Cart memberCart, Cart sessionCart) {
        for (CartItem sessionItem : sessionCart.getCartItems()) {
            // 중복 상품 확인
            CartItem existing = memberCart.getCartItems().stream()
                    .filter(item -> item.getProduct().getProductId().equals(sessionItem.getProduct().getProductId()))
                    .filter(item -> {
                        if (sessionItem.getOptionStock() == null) {
                            return item.getOptionStock() == null;
                        }
                        return item.getOptionStock() != null &&
                                item.getOptionStock().getOptionStockId()
                                        .equals(sessionItem.getOptionStock().getOptionStockId());
                    })
                    .findFirst()
                    .orElse(null);

            if (existing != null) {
                existing.setQuantity(existing.getQuantity() + sessionItem.getQuantity());
                // sessionItem은 삭제될 예정이므로 관계 끊기 불필요하지만 명시적으로 처리 가능
            } else {
                // 새로운 아이템으로 복사해서 추가 (JPA 관계 재설정)
                CartItem newItem = CartItem.builder()
                        .cart(memberCart)
                        .product(sessionItem.getProduct())
                        .optionStock(sessionItem.getOptionStock())
                        .price(sessionItem.getPrice())
                        .quantity(sessionItem.getQuantity())
                        .build();
                memberCart.addCartItem(newItem);
            }
        }
        // sessionCart의 아이템들은 orphanRemoval=true에 의해 Cart 삭제 시 같이 삭제됨
        // 하지만 여기서 명시적으로 리스트를 비워주는 것이 안전할 수 있음
        sessionCart.getCartItems().clear();
    }

    @Override
    public void updateCartItem(Long cartItemId, CartUpdateRequest request) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_ITEM_NOT_FOUND));

        if (request.getQuantity() != null && request.getQuantity() > 0) {
            cartItem.setQuantity(request.getQuantity());
            cartItemRepository.save(cartItem);
        } else {
            throw new BusinessException(ErrorCode.CART_ITEM_NOT_FOUND);
        }
    }

    @Override
    public void removeCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_ITEM_NOT_FOUND));

        Cart cart = cartItem.getCart();
        if (cart != null) {
            cart.removeCartItem(cartItem);
        }

        cartItemRepository.delete(cartItem);
    }
}
