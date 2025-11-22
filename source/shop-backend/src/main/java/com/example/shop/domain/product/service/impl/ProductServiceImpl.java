package com.example.shop.domain.product.service.impl;

import com.example.shop.domain.product.dto.ProductDto;
import com.example.shop.domain.product.entity.Product;
import com.example.shop.domain.product.repository.ProductRepository;
import com.example.shop.domain.product.service.ProductService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional
    public ProductDto createProduct(ProductDto productDto) {
        Product product = Product.builder()
                .name(productDto.getName())
                .description(productDto.getDescription())
                .brand(productDto.getBrand())
                .price(productDto.getPrice())
                .discountPrice(productDto.getDiscountPrice())
                .build();
        return toDto(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductDto updateProduct(Long productId, ProductDto productDto) {
        Product product = findProduct(productId);
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setBrand(productDto.getBrand());
        product.setPrice(productDto.getPrice());
        product.setDiscountPrice(productDto.getDiscountPrice());
        return toDto(product);
    }

    @Override
    @Transactional
    public void deleteProduct(Long productId) {
        Product product = findProduct(productId);
        productRepository.delete(product);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto getProduct(Long productId) {
        return toDto(findProduct(productId));
    }

    @Override
    public Page<ProductDto> getProductList(Long categoryId, String sort, Integer minPrice, Integer maxPrice,
            String keyword,
            Pageable pageable) {
        log.info(
                "ProductService.getProductList called with: categoryId={}, sort={}, minPrice={}, maxPrice={}, keyword={}, pageable={}",
                categoryId, sort, minPrice, maxPrice, keyword, pageable);

        if (keyword != null && !keyword.trim().isEmpty()) {
            return productRepository.findByKeyword(keyword, pageable).map(this::toDto);
        }

        // Filtering/Sorting 로직은 추후 구현
        return productRepository.findAll(pageable).map(this::toDto);
    }

    private Product findProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    private ProductDto toDto(Product product) {
        return ProductDto.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .brand(product.getBrand())
                .description(product.getDescription())
                .build();
    }
}
