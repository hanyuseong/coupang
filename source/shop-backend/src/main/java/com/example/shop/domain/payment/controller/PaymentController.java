package com.example.shop.domain.payment.controller;

import com.example.shop.global.common.ApiResponse;
import com.example.shop.domain.payment.dto.PaymentDto;
import com.example.shop.domain.payment.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PaymentDto>> createPayment(@RequestBody PaymentDto paymentDto) {
        PaymentDto response = paymentService.createPayment(paymentDto);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.ok(response));
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse<PaymentDto>> getPayment(@PathVariable Long paymentId) {
        return ResponseEntity.ok(ApiResponse.ok(paymentService.getPayment(paymentId)));
    }

    @PostMapping("/{paymentId}/approve")
    public ResponseEntity<ApiResponse<String>> approvePayment(@PathVariable Long paymentId) {
        paymentService.approvePayment(paymentId);
        return ResponseEntity.ok(ApiResponse.ok("Payment approved successfully"));
    }

    @PostMapping("/{paymentId}/cancel")
    public ResponseEntity<ApiResponse<String>> cancelPayment(@PathVariable Long paymentId) {
        paymentService.cancelPayment(paymentId);
        return ResponseEntity.ok(ApiResponse.ok("Payment cancelled successfully"));
    }
}
