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
    public CartDto getCart(Long memberId) {
        Cart cart = findCartOrCreate(memberId);
        return new CartDto(cart);
    }

    @Override
    public void addToCart(Long memberId, CartAddRequest request) {
        Cart cart = findCartOrCreate(memberId);
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

    private Cart createCart(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND));
        Cart cart = new Cart(member);
        return cartRepository.save(cart);
    }

    private Cart findCartOrCreate(Long memberId) {
        if (memberId != null) {
            return cartRepository.findFirstByMember_MemberId(memberId)
                    .orElseGet(() -> createCart(memberId));
        }

        // When unauthenticated: use the first cart (prefer one with items), otherwise
        // create a cart for the first member.
        return cartRepository.findAll().stream()
                .sorted((a, b) -> Boolean.compare(b.getCartItems() != null && !b.getCartItems().isEmpty(),
                        a.getCartItems() != null && !a.getCartItems().isEmpty()))
                .findFirst()
                .orElseGet(() -> {
                    Member firstMember = memberRepository.findAll().stream()
                            .findFirst()
                            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND));
                    return createCart(firstMember.getMemberId());
                });
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
