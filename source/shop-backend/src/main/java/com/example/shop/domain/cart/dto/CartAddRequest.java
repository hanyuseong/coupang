package com.example.shop.domain.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartAddRequest {
    private Long productId;
    private Long optionStockId;
    private Integer quantity;
}

