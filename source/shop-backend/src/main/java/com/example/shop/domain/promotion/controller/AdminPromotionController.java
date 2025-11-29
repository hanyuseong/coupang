package com.example.shop.domain.promotion.controller;

import com.example.shop.domain.promotion.dto.PromotionDto;
import com.example.shop.domain.promotion.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/promotions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminPromotionController {

    private final PromotionService promotionService;

    @GetMapping
    public ResponseEntity<List<PromotionDto>> getAllPromotions() {
        return ResponseEntity.ok(promotionService.getAllPromotions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromotionDto> getPromotion(@PathVariable Long id) {
        return ResponseEntity.ok(promotionService.getPromotion(id));
    }

    @PostMapping
    public ResponseEntity<PromotionDto> createPromotion(@RequestBody PromotionDto dto) {
        return ResponseEntity.ok(promotionService.createPromotion(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromotionDto> updatePromotion(@PathVariable Long id, @RequestBody PromotionDto dto) {
        return ResponseEntity.ok(promotionService.updatePromotion(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionService.deletePromotion(id);
        return ResponseEntity.ok().build();
    }
}
