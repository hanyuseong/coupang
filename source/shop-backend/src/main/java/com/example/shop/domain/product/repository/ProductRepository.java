package com.example.shop.domain.product.repository;

import com.example.shop.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @org.springframework.data.jpa.repository.Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword% OR p.brand LIKE %:keyword%")
    org.springframework.data.domain.Page<Product> findByKeyword(
            @org.springframework.data.repository.query.Param("keyword") String keyword,
            org.springframework.data.domain.Pageable pageable);
}
