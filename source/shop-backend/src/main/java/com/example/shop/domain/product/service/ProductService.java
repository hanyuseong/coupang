package com.example.shop.domain.product.service;

import com.example.shop.domain.product.dto.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);

    ProductDto updateProduct(Long productId, ProductDto productDto);

    void deleteProduct(Long productId);

    List<ProductDto> getAllProducts();

    ProductDto getProduct(Long productId);

    Page<ProductDto> getProductList(Long categoryId, String sort, Integer minPrice, Integer maxPrice, String keyword,
            Pageable pageable);
}
