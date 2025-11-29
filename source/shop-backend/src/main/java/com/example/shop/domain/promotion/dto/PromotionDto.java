package com.example.shop.domain.promotion.dto;

import com.example.shop.domain.promotion.entity.Promotion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromotionDto {
    private Long id;
    private String title;
    private String description;
    private String bannerImage;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean isActive;

    public static PromotionDto from(Promotion promotion) {
        return PromotionDto.builder()
                .id(promotion.getId())
                .title(promotion.getTitle())
                .description(promotion.getDescription())
                .bannerImage(promotion.getBannerImage())
                .startDate(promotion.getStartDate())
                .endDate(promotion.getEndDate())
                .isActive(promotion.isActive())
                .build();
    }
}
