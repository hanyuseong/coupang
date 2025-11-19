package com.example.shop.domain.payment.service.impl;

import com.example.shop.domain.order.entity.Order;
import com.example.shop.domain.payment.dto.PaymentDto;
import com.example.shop.domain.payment.entity.Payment;
import com.example.shop.domain.payment.enums.PaymentMethod;
import com.example.shop.domain.payment.enums.PaymentStatus;
import com.example.shop.domain.payment.repository.PaymentRepository;
import com.example.shop.domain.payment.service.PaymentService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    @Transactional
    public PaymentDto createPayment(PaymentDto paymentDto) {
        Payment payment = Payment.builder()
                .order(createOrderRef(paymentDto.getOrderId()))
                .pgProvider(paymentDto.getPgProvider())
                .method(paymentDto.getMethod() != null ? PaymentMethod.valueOf(paymentDto.getMethod()) : null)
                .amount(paymentDto.getAmount())
                .status(paymentDto.getStatus() != null ? PaymentStatus.valueOf(paymentDto.getStatus()) : PaymentStatus.PENDING)
                .pgTid(paymentDto.getPgTid())
                .requestedAt(LocalDateTime.now())
                .build();

        return toDto(paymentRepository.save(payment));
    }

    @Override
    public PaymentDto getPayment(Long paymentId) {
        return paymentRepository.findById(paymentId)
                .map(this::toDto)
                .orElseThrow(() -> new BusinessException(ErrorCode.PAYMENT_NOT_FOUND));
    }

    @Override
    @Transactional
    public void approvePayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PAYMENT_NOT_FOUND));
        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setApprovedAt(LocalDateTime.now());
    }

    @Override
    @Transactional
    public void cancelPayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PAYMENT_NOT_FOUND));
        payment.setStatus(PaymentStatus.FAILED);
    }

    private PaymentDto toDto(Payment payment) {
        return PaymentDto.builder()
                .paymentId(payment.getPaymentId())
                .orderId(payment.getOrder() != null ? payment.getOrder().getOrderId() : null)
                .pgProvider(payment.getPgProvider())
                .method(payment.getMethod() != null ? payment.getMethod().name() : null)
                .amount(payment.getAmount())
                .status(payment.getStatus() != null ? payment.getStatus().name() : null)
                .pgTid(payment.getPgTid())
                .requestedAt(payment.getRequestedAt() != null ? payment.getRequestedAt().toString() : null)
                .approvedAt(payment.getApprovedAt() != null ? payment.getApprovedAt().toString() : null)
                .build();
    }

    private Order createOrderRef(Long orderId) {
        if (orderId == null) {
            return null;
        }
        Order order = new Order();
        order.setOrderId(orderId);
        return order;
    }
}
