package com.example.shop.domain.admin.service;

import com.example.shop.domain.admin.dto.AdminProductDto;
import com.example.shop.domain.product.dto.ProductImageDto;
import com.example.shop.domain.product.entity.Product;
import com.example.shop.domain.product.entity.ProductImage;
import com.example.shop.domain.product.repository.ProductRepository;
import com.example.shop.domain.product.repository.ProductImageRepository;
import com.example.shop.global.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminProductService {

    private final ProductRepository productRepository;
    private final com.example.shop.domain.category.repository.CategoryRepository categoryRepository;
    private final FileService fileService;
    private final ProductImageRepository productImageRepository;

    public List<AdminProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public AdminProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
        return convertToDto(product);
    }

    @Transactional
    public AdminProductDto createProduct(AdminProductDto dto) {
        Product product = Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .brand(dto.getBrand())
                .price(dto.getPrice())
                .discountPrice(dto.getDiscountPrice())
                .stock(dto.getStock())
                .status(dto.getStatus())
                .build();

        if (dto.getCategoryId() != null) {
            com.example.shop.domain.category.entity.Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(
                            () -> new IllegalArgumentException("Category not found with id: " + dto.getCategoryId()));
            product.setCategory(category);
        }

        Product saved = productRepository.save(product);
        return convertToDto(saved);
    }

    @Transactional
    public AdminProductDto updateProduct(Long id, AdminProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setBrand(dto.getBrand());
        product.setPrice(dto.getPrice());
        product.setDiscountPrice(dto.getDiscountPrice());
        product.setStock(dto.getStock());
        product.setStatus(dto.getStatus());

        if (dto.getCategoryId() != null) {
            com.example.shop.domain.category.entity.Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(
                            () -> new IllegalArgumentException("Category not found with id: " + dto.getCategoryId()));
            product.setCategory(category);
        } else {
            product.setCategory(null);
        }

        return convertToDto(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));

        // Delete image files
        if (product.getImages() != null) {
            for (ProductImage image : product.getImages()) {
                String fileName = image.getImageUrl().substring(image.getImageUrl().lastIndexOf("/") + 1);
                fileService.deleteFile(fileName);
            }
        }

        productRepository.delete(product);
    }

    @Transactional
    public ProductImageDto uploadImage(Long productId, MultipartFile file) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));

        String fileName = fileService.storeFile(file);
        String imageUrl = "/images/" + fileName;

        ProductImage productImage = ProductImage.builder()
                .product(product)
                .imageUrl(imageUrl)
                .sortOrder(product.getImages().size())
                .build();

        ProductImage savedImage = productImageRepository.save(productImage);

        return new ProductImageDto(savedImage.getImageId(), savedImage.getImageUrl(), savedImage.getSortOrder());
    }

    @Transactional
    public void deleteImage(Long imageId) {
        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new IllegalArgumentException("Image not found with id: " + imageId));

        // Extract filename from URL
        String fileName = image.getImageUrl().substring(image.getImageUrl().lastIndexOf("/") + 1);
        fileService.deleteFile(fileName);

        productImageRepository.delete(image);
    }

    private AdminProductDto convertToDto(Product product) {
        List<ProductImageDto> images = product.getImages() != null ? product.getImages().stream()
                .map(img -> new ProductImageDto(img.getImageId(), img.getImageUrl(), img.getSortOrder()))
                .collect(Collectors.toList()) : null;

        return AdminProductDto.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .description(product.getDescription())
                .brand(product.getBrand())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .stock(product.getStock())
                .status(product.getStatus())
                .categoryId(product.getCategory() != null ? product.getCategory().getCategoryId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .images(images)
                .build();
    }
}
