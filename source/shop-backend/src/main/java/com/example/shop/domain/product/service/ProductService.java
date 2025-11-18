package com.example.shop.domain.product.service;

import com.example.shop.domain.product.dto.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    ProductDto getProduct(Long productId);
    Page<ProductDto> getProductList(String categoryId, String sort, Integer minPrice, Integer maxPrice, Pageable pageable);
}