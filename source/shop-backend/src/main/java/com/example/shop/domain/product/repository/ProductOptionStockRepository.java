package com.example.shop.domain.product.repository;

import com.example.shop.domain.product.entity.ProductOptionStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductOptionStockRepository extends JpaRepository<ProductOptionStock, Long> {
}
