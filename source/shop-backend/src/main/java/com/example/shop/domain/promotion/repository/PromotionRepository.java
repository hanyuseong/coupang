package com.example.shop.domain.promotion.repository;

import com.example.shop.domain.promotion.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
}
