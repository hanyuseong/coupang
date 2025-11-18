package com.example.shop.domain.payment.service.impl;

import com.example.shop.domain.payment.dto.PaymentDto;
import com.example.shop.domain.payment.entity.Payment;
import com.example.shop.domain.payment.repository.PaymentRepository;
import com.example.shop.domain.payment.service.PaymentService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    @Transactional
    public PaymentDto createPayment(PaymentDto paymentDto) {
        Payment payment = new Payment();
        payment.setOrderId(paymentDto.getOrderId());
        payment.setMethod(paymentDto.getMethod());
        payment.setAmount(paymentDto.getAmount());
        payment.setStatus(paymentDto.getStatus());

        Payment savedPayment = paymentRepository.save(payment);
        return new PaymentDto(savedPayment);
    }

    @Override
    public PaymentDto getPayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PAYMENT_NOT_FOUND));
        return new PaymentDto(payment);
    }

    @Override
    @Transactional
    public void approvePayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PAYMENT_NOT_FOUND));
        payment.setStatus("SUCCESS");
        paymentRepository.save(payment);
    }

    @Override
    @Transactional
    public void cancelPayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PAYMENT_NOT_FOUND));
        payment.setStatus("CANCELLED");
        paymentRepository.save(payment);
    }
}