package com.example.shop.domain.review.service.impl;

import com.example.shop.domain.member.entity.Member;
import com.example.shop.domain.product.entity.Product;
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
    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = new Review();
        review.setProduct(Product.builder().productId(reviewDto.getProductId()).build());
        review.setMember(Member.builder().memberId(reviewDto.getMemberId()).build());
        review.setRating(reviewDto.getRating());
        review.setContent(reviewDto.getContent());
        return convertToDto(reviewRepository.save(review));
    }

    @Override
    public List<ReviewDto> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProduct_ProductId(productId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReviewDto updateReview(Long reviewId, ReviewDto reviewDto) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessException(ErrorCode.REVIEW_NOT_FOUND));
        review.setRating(reviewDto.getRating());
        review.setContent(reviewDto.getContent());
        return convertToDto(review);
    }

    @Override
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessException(ErrorCode.REVIEW_NOT_FOUND));
        reviewRepository.delete(review);
    }

    @Override
    public List<ReviewDto> getRecentReviews() {
        List<Review> reviews = reviewRepository.findTop3ByOrderByCreatedAtDesc();
        return reviews.stream()
                .map(ReviewDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public org.springframework.data.domain.Page<ReviewDto> getAllReviews(
            org.springframework.data.domain.Pageable pageable) {
        return reviewRepository.findAll(pageable)
                .map(ReviewDto::from);
    }

    private ReviewDto convertToDto(Review review) {
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
