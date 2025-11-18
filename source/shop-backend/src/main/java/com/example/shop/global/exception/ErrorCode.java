package com.example.shop.global.exception;

public enum ErrorCode {
    MEMBER_NOT_FOUND("MEMBER_NOT_FOUND", "Member not found."),
    INVALID_PASSWORD("INVALID_PASSWORD", "Invalid password."),
    EMAIL_ALREADY_EXISTS("EMAIL_ALREADY_EXISTS", "Email already exists."),
    ADDRESS_NOT_FOUND("ADDRESS_NOT_FOUND", "Address not found."),
    PRODUCT_NOT_FOUND("PRODUCT_NOT_FOUND", "Product not found."),
    ORDER_NOT_FOUND("ORDER_NOT_FOUND", "Order not found."),
    CART_ITEM_NOT_FOUND("CART_ITEM_NOT_FOUND", "Cart item not found."),
    PAYMENT_FAILED("PAYMENT_FAILED", "Payment failed."),
    COUPON_NOT_FOUND("COUPON_NOT_FOUND", "Coupon not found."),
    POINTS_NOT_ENOUGH("POINTS_NOT_ENOUGH", "Not enough points."),
    UNAUTHORIZED("UNAUTHORIZED", "Unauthorized access."),
    FORBIDDEN("FORBIDDEN", "Access is forbidden."),
    INTERNAL_SERVER_ERROR("INTERNAL_SERVER_ERROR", "Internal server error.");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}