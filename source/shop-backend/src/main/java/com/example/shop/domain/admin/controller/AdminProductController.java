package com.example.shop.domain.admin.controller;

import com.example.shop.domain.admin.dto.AdminProductDto;
import com.example.shop.domain.admin.service.AdminProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductService adminProductService;

    @GetMapping
    public List<AdminProductDto> getAllProducts() {
        return adminProductService.getAllProducts();
    }

    @GetMapping("/{id}")
    public AdminProductDto getProductById(@PathVariable Long id) {
        return adminProductService.getProductById(id);
    }

    @PostMapping
    public AdminProductDto createProduct(@RequestBody AdminProductDto product) {
        return adminProductService.createProduct(product);
    }

    @PutMapping("/{id}")
    public AdminProductDto updateProduct(@PathVariable Long id, @RequestBody AdminProductDto product) {
        return adminProductService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        adminProductService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<com.example.shop.domain.product.dto.ProductImageDto> uploadImage(@PathVariable Long id,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        com.example.shop.domain.product.dto.ProductImageDto result = adminProductService.uploadImage(id, file);
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(result);
    }

    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long imageId) {
        adminProductService.deleteImage(imageId);
        return ResponseEntity.ok().build();
    }
}
