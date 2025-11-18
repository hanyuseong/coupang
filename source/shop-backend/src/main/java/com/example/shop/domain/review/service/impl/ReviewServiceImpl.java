package com.example.shop.domain.review.service.impl;

import com.example.shop.domain.review.dto.ReviewDto;
import com.example.shop.domain.review.entity.Review;
import com.example.shop.domain.review.repository.ReviewRepository;
import com.example.shop.domain.review.service.ReviewService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public List<ReviewDto> getReviewsByProductId(Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return reviews.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = new Review();
        review.setProductId(reviewDto.getProductId());
        review.setMemberId(reviewDto.getMemberId());
        review.setRating(reviewDto.getRating());
        review.setContent(reviewDto.getContent());
        review = reviewRepository.save(review);
        return convertToDto(review);
    }

    @Override
    public void deleteReview(Long reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new BusinessException(ErrorCode.REVIEW_NOT_FOUND);
        }
        reviewRepository.deleteById(reviewId);
    }

    private ReviewDto convertToDto(Review review) {
        return new ReviewDto(
                review.getReviewId(),
                review.getProductId(),
                review.getMemberId(),
                review.getRating(),
                review.getContent(),
                review.getCreatedAt()
        );
    }
}