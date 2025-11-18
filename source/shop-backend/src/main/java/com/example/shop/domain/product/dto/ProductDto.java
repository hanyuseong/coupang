package com.example.shop.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Long productId;
    private String name;
    private int price;
    private Integer discountPrice;
    private String brand;
    private String description;
    private String thumbnail;
    private double rating;
    private int reviewCount;
    private String deliveryType;
}