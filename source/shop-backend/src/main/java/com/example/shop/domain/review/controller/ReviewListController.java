package com.example.shop.domain.review.controller;

import com.example.shop.domain.review.dto.ReviewDto;
import com.example.shop.domain.review.service.ReviewService;
import com.example.shop.global.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews-list")
public class ReviewListController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getAllReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        List<ReviewDto> reviews = reviewService.getAllReviews(pageable).getContent();
        return ResponseEntity.ok(ApiResponse.ok(reviews));
    }
}
