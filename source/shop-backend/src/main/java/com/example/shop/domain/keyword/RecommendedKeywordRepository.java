package com.example.shop.domain.keyword;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecommendedKeywordRepository extends JpaRepository<RecommendedKeyword, Long> {
    List<RecommendedKeyword> findByIsActiveTrueOrderByDisplayOrderAsc();
}
