package com.example.shop.domain.keyword;

import com.example.shop.global.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/keywords")
@RequiredArgsConstructor
public class RecommendedKeywordController {

    private final RecommendedKeywordRepository recommendedKeywordRepository;

    @GetMapping("/recommended")
    public ApiResponse<List<String>> getRecommendedKeywords() {
        List<RecommendedKeyword> keywords = recommendedKeywordRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
        List<String> keywordStrings = keywords.stream()
                .map(RecommendedKeyword::getKeyword)
                .collect(Collectors.toList());
        return ApiResponse.ok(keywordStrings);
    }
}
