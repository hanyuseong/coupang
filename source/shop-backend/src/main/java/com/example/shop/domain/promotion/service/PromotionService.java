package com.example.shop.domain.promotion.service;

import com.example.shop.domain.promotion.dto.PromotionDto;
import com.example.shop.domain.promotion.entity.Promotion;
import com.example.shop.domain.promotion.repository.PromotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PromotionService {

    private final PromotionRepository promotionRepository;

    public List<PromotionDto> getAllPromotions() {
        return promotionRepository.findAll().stream()
                .map(PromotionDto::from)
                .collect(Collectors.toList());
    }

    public PromotionDto getPromotion(Long id) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Promotion not found with id: " + id));
        return PromotionDto.from(promotion);
    }

    @Transactional
    public PromotionDto createPromotion(PromotionDto dto) {
        Promotion promotion = Promotion.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .bannerImage(dto.getBannerImage())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .isActive(dto.isActive())
                .build();
        return PromotionDto.from(promotionRepository.save(promotion));
    }

    @Transactional
    public PromotionDto updatePromotion(Long id, PromotionDto dto) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Promotion not found with id: " + id));

        promotion.update(
                dto.getTitle(),
                dto.getDescription(),
                dto.getBannerImage(),
                dto.getStartDate(),
                dto.getEndDate(),
                dto.isActive());
        return PromotionDto.from(promotion);
    }

    @Transactional
    public void deletePromotion(Long id) {
        promotionRepository.deleteById(id);
    }
}
