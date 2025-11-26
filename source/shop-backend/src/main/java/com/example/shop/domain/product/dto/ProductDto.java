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

    public static ProductDto from(com.example.shop.domain.product.entity.Product product) {
        return ProductDto.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .brand(product.getBrand())
                .description(product.getDescription())
                // .thumbnail(product.getThumbnail()) // Assuming thumbnail logic is handled
                // elsewhere or needs addition
                .rating(0.0) // Default or fetch from reviews
                .reviewCount(0) // Default or fetch from reviews
                .build();
    }
}
