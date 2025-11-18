package com.example.shop.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDto {
    private Long paymentId;
    private Long orderId;
    private String pgProvider;
    private String method;
    private int amount;
    private String status;
    private String pgTid;
    private String requestedAt;
    private String approvedAt;
}