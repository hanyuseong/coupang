package com.example.shop.domain.product.controller;

import com.example.shop.global.common.ApiResponse;
import com.example.shop.domain.product.dto.ProductDto;
import com.example.shop.domain.product.service.ProductService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{productId}")
    public ApiResponse<ProductDto> getProduct(@PathVariable Long productId) {
        log.debug("getProduct1: {}", productId);
        return ApiResponse.ok(productService.getProduct(productId));
    }

    @GetMapping
    public ApiResponse<Page<ProductDto>> getProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            Pageable pageable) {
        log.info("getProducts called: categoryId={}, minPrice={}, maxPrice={}, pageable={}",
                categoryId, minPrice, maxPrice, pageable);

        // Swagger UI sends "string" as default sort value, which causes 400 error.
        // Sanitize pageable if it contains invalid sort "string"
        if (pageable.getSort().stream().anyMatch(order -> "string".equals(order.getProperty()))) {
            pageable = org.springframework.data.domain.PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
            log.info("Sanitized invalid sort 'string' from pageable");
        }

        Page<ProductDto> result = productService.getProductList(categoryId, null, minPrice, maxPrice, pageable);
        log.info("getProducts result count: {}", result.getTotalElements());
        return ApiResponse.ok(result);
    }
}
