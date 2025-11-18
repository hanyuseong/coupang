package com.example.shop.domain.product.service.impl;

import com.example.shop.domain.product.dto.ProductDto;
import com.example.shop.domain.product.entity.Product;
import com.example.shop.domain.product.repository.ProductRepository;
import com.example.shop.domain.product.service.ProductService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public ProductDto getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
        return convertToDto(product);
    }

    private ProductDto convertToDto(Product product) {
        return new ProductDto(
                product.getProductId(),
                product.getName(),
                product.getPrice(),
                product.getDiscountPrice(),
                product.getDescription(),
                product.getBrand(),
                product.getImages() // Assuming Product has a method to get images
        );
    }
}