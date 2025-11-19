package com.example.shop.domain.payment.dto;

import com.example.shop.domain.payment.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {
    private Long orderId;
    private PaymentMethod method;
    private int amount;
    private String pgProvider;
}

