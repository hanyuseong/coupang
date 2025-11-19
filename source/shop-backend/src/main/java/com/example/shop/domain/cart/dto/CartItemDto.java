package com.example.shop.domain.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDto {
    private Long cartItemId;
    private Long productId;
    private String productName;
    private Long optionStockId;
    private Integer quantity;
    private Integer price;
}

