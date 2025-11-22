package com.example.shop.domain.member.service.impl;

import com.example.shop.domain.member.dto.AuthResponse;
import com.example.shop.domain.member.dto.LoginRequest;
import com.example.shop.domain.member.dto.SignUpRequest;
import com.example.shop.domain.member.entity.Member;
import com.example.shop.domain.member.enums.MemberStatus;
import com.example.shop.domain.member.repository.MemberRepository;
import com.example.shop.domain.member.service.AuthService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import com.example.shop.config.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void signup(SignUpRequest req) {
        log.info("=== Signup attempt for email: {}", req.getEmail());
        Member member = Member.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .name(req.getName())
                .phone(req.getPhone())
                .status(MemberStatus.ACTIVE)
                .build();
        log.info("=== Password encoded, saving member");
        memberRepository.save(member);
        log.info("=== Member saved successfully");
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        log.info("=== Login attempt for email: {}", req.getEmail());
        log.info("=== Input password length: {}", req.getPassword() != null ? req.getPassword().length() : "null");

        Member member = memberRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> {
                    log.error("=== Member not found for email: {}", req.getEmail());
                    return new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
                });

        log.info("=== Member found: {}", member.getEmail());
        log.info("=== Stored password hash: {}", member.getPassword());
        log.info("=== Input password: {}", req.getPassword());

        boolean matches = passwordEncoder.matches(req.getPassword(), member.getPassword());
        log.info("=== Password matches: {}", matches);

        if (!matches) {
            log.error("=== Password mismatch for email: {}", req.getEmail());
            throw new BusinessException(ErrorCode.INVALID_PASSWORD);
        }

        log.info("=== Generating tokens for: {}", member.getEmail());
        String accessToken = jwtTokenProvider.generateAccessToken(member.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(member.getEmail());

        return new AuthResponse(accessToken, refreshToken);
    }

    @Override
    public String refreshToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED);
        }
        String email = jwtTokenProvider.getEmailFromToken(refreshToken);
        return jwtTokenProvider.generateAccessToken(email);
    }
}
