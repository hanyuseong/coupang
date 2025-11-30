package com.example.shop.domain.promotion.controller;

import com.example.shop.domain.promotion.dto.PromotionDto;
import com.example.shop.domain.promotion.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.shop.global.common.ApiResponse;

@RestController
@RequestMapping("/api/promotions")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
public class PromotionController {

    private final PromotionService promotionService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PromotionDto>> getPromotion(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(promotionService.getPromotion(id)));
    }
}
