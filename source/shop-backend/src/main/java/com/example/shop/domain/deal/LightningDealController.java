package com.example.shop.domain.deal;

import com.example.shop.domain.product.dto.ProductDto;
import com.example.shop.global.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lightning-deals")
@RequiredArgsConstructor
public class LightningDealController {

    private final LightningDealRepository lightningDealRepository;

    @GetMapping
    public ApiResponse<List<ProductDto>> getLightningDeals() {
        List<LightningDeal> deals = lightningDealRepository.findAllActiveDeals();
        List<ProductDto> products = deals.stream()
                .map(deal -> ProductDto.from(deal.getProduct()))
                .collect(Collectors.toList());
        return ApiResponse.ok(products);
    }
}
