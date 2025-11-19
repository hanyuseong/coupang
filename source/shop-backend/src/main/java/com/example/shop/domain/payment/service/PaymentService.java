package com.example.shop.domain.payment.service;

import com.example.shop.domain.payment.dto.PaymentDto;

public interface PaymentService {
    PaymentDto createPayment(PaymentDto paymentDto);
    PaymentDto getPayment(Long paymentId);
    void approvePayment(Long paymentId);
    void cancelPayment(Long paymentId);
}
