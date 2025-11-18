package com.example.shop.domain.payment.controller;

import com.example.shop.global.common.ApiResponse;
import com.example.shop.domain.payment.dto.PaymentDto;
import com.example.shop.domain.payment.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/ready")
    public ResponseEntity<ApiResponse<PaymentDto>> readyPayment(@Valid @RequestBody PaymentDto paymentDto) {
        PaymentDto response = paymentService.preparePayment(paymentDto);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.ok(response));
    }

    @PostMapping("/approve")
    public ResponseEntity<ApiResponse<String>> approvePayment(@Valid @RequestBody PaymentDto paymentDto) {
        paymentService.approvePayment(paymentDto);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.ok("Payment approved successfully"));
    }
}