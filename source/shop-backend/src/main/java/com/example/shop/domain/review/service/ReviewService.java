package com.example.shop.domain.review.service;

import com.example.shop.domain.review.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(ReviewDto reviewDto);
    List<ReviewDto> getReviewsByProductId(Long productId);
    ReviewDto updateReview(Long reviewId, ReviewDto reviewDto);
    void deleteReview(Long reviewId);
}