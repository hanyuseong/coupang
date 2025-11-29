package com.example.shop.domain.promotion.entity;

import com.example.shop.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "promotions")
public class Promotion extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String bannerImage;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean isActive;

    @Builder
    public Promotion(String title, String description, String bannerImage, LocalDateTime startDate,
            LocalDateTime endDate, boolean isActive) {
        this.title = title;
        this.description = description;
        this.bannerImage = bannerImage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
    }

    public void update(String title, String description, String bannerImage, LocalDateTime startDate,
            LocalDateTime endDate, boolean isActive) {
        this.title = title;
        this.description = description;
        this.bannerImage = bannerImage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
    }
}
