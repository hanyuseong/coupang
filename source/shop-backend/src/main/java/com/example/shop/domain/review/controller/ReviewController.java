package com.example.shop.domain.review.controller;

import com.example.shop.global.common.ApiResponse;
import com.example.shop.domain.review.dto.ReviewDto;
import com.example.shop.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewDto>> createReview(@RequestBody ReviewDto reviewDto) {
        ReviewDto createdReview = reviewService.createReview(reviewDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(createdReview));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getReviewsByProductId(@PathVariable Long productId) {
        List<ReviewDto> reviews = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(ApiResponse.ok(reviews));
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<ReviewDto>> updateReview(@PathVariable Long reviewId,
            @RequestBody ReviewDto reviewDto) {
        ReviewDto updatedReview = reviewService.updateReview(reviewId, reviewDto);
        return ResponseEntity.ok(ApiResponse.ok(updatedReview));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<String>> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok(ApiResponse.ok("Review deleted successfully"));
    }

    @GetMapping("/recent")
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getRecentReviews() {
        List<ReviewDto> reviews = reviewService.getRecentReviews();
        return ResponseEntity.ok(ApiResponse.ok(reviews));
    }

    @GetMapping("/list-all")
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getAllReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        List<ReviewDto> reviews = reviewService.getAllReviews(pageable).getContent();
        return ResponseEntity.ok(ApiResponse.ok(reviews));
    }
}
