package com.example.shop.domain.member.controller;

import com.example.shop.global.common.ApiResponse;
import com.example.shop.domain.member.dto.AuthResponse;
import com.example.shop.domain.member.dto.LoginRequest;
import com.example.shop.domain.member.dto.SignUpRequest;
import com.example.shop.domain.member.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<String>> signup(@RequestBody SignUpRequest request) {
        authService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("회원가입이 완료되었습니다"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        log.info("@@@ AuthController.login called for email: {}", request.getEmail());
        AuthResponse authResponse = authService.login(request);
        log.info("@@@ AuthController.login successful");
        return ResponseEntity.ok(ApiResponse.ok(authResponse));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<String>> refresh(@RequestBody String refreshToken) {
        String newAccessToken = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(ApiResponse.ok(newAccessToken));
    }
}
