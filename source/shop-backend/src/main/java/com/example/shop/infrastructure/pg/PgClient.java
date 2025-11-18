package com.example.shop.infrastructure.pg;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class PgClient {

    private final RestTemplate restTemplate;

    public PgClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String initiatePayment(PaymentRequest paymentRequest) {
        // Logic to initiate payment with the payment gateway
        String paymentGatewayUrl = "https://api.paymentgateway.com/initiate";
        return restTemplate.postForObject(paymentGatewayUrl, paymentRequest, String.class);
    }

    public PaymentResponse approvePayment(String transactionId) {
        // Logic to approve payment with the payment gateway
        String paymentGatewayUrl = "https://api.paymentgateway.com/approve/" + transactionId;
        return restTemplate.getForObject(paymentGatewayUrl, PaymentResponse.class);
    }

    public void cancelPayment(String transactionId) {
        // Logic to cancel payment with the payment gateway
        String paymentGatewayUrl = "https://api.paymentgateway.com/cancel/" + transactionId;
        restTemplate.delete(paymentGatewayUrl);
    }
}