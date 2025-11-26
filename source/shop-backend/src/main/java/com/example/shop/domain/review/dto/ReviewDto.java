package com.example.shop.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDto {
    private Long reviewId;
    private Long productId;
    private Long memberId;
    private int rating;
    private String content;
    private String createdAt;

    public static ReviewDto from(com.example.shop.domain.review.entity.Review review) {
        return ReviewDto.builder()
                .reviewId(review.getReviewId())
                .productId(review.getProduct() != null ? review.getProduct().getProductId() : null)
                .memberId(review.getMember() != null ? review.getMember().getMemberId() : null)
                .rating(review.getRating())
                .content(review.getContent())
                .createdAt(review.getCreatedAt() != null ? review.getCreatedAt().toString() : null)
                .build();
    }
}
