package com.example.shop.domain.member.service;

import com.example.shop.domain.member.dto.AuthResponse;
import com.example.shop.domain.member.dto.LoginRequest;
import com.example.shop.domain.member.dto.SignUpRequest;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    void signup(SignUpRequest request);
    String refreshToken(String refreshToken);
}
