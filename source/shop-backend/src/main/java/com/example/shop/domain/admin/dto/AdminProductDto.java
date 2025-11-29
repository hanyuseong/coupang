package com.example.shop.domain.admin.dto;

import com.example.shop.domain.product.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductDto {
    private Long productId;
    private String name;
    private String description;
    private String brand;
    private int price;
    private Integer discountPrice;
    private int stock;
    private ProductStatus status;
    private Long categoryId;
    private String categoryName;
    private java.util.List<com.example.shop.domain.product.dto.ProductImageDto> images;
}
