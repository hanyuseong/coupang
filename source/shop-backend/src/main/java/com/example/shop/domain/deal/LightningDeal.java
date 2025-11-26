package com.example.shop.domain.deal;

import com.example.shop.domain.product.entity.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class LightningDeal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dealId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private Boolean isActive;

    private LocalDateTime createdAt;
}
