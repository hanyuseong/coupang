package com.example.shop.domain.deal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LightningDealRepository extends JpaRepository<LightningDeal, Long> {
    @Query("SELECT ld FROM LightningDeal ld JOIN FETCH ld.product WHERE ld.isActive = true")
    List<LightningDeal> findAllActiveDeals();
}
