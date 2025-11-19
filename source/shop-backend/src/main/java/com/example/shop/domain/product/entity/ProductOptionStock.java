package com.example.shop.domain.product.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOptionStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long optionStockId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option1_id")
    private ProductOption option1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option2_id")
    private ProductOption option2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option3_id")
    private ProductOption option3;

    private int stock;
    private int price;
}
