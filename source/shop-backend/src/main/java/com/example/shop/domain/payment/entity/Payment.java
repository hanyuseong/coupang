package com.example.shop.domain.payment.entity;

import com.example.shop.global.common.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Order order;

    private String pgProvider;

    @Enumerated(EnumType.STRING)
    private PaymentMethod method;

    private int amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String pgTid;

    private LocalDateTime requestedAt;

    private LocalDateTime approvedAt;
}