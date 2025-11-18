package com.example.shop.domain.payment.service;

import com.example.shop.domain.payment.dto.PaymentDto;

public interface PaymentService {
    PaymentDto createPayment(Long orderId, String method);
    PaymentDto approvePayment(Long orderId, String pgToken);
}