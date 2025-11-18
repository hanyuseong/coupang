package com.example.shop.domain.member.service.impl;

import com.example.shop.domain.member.dto.AuthResponse;
import com.example.shop.domain.member.dto.LoginRequest;
import com.example.shop.domain.member.dto.SignUpRequest;
import com.example.shop.domain.member.entity.Member;
import com.example.shop.domain.member.repository.MemberRepository;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import com.example.shop.config.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void signup(SignUpRequest req) {
        Member member = Member.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .name(req.getName())
                .phone(req.getPhone())
                .status(MemberStatus.ACTIVE)
                .build();
        memberRepository.save(member);
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        Member member = memberRepository.findByEmail(req.getEmail())
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND));

        if (!passwordEncoder.matches(req.getPassword(), member.getPassword()))
            throw new BusinessException(ErrorCode.INVALID_PASSWORD);

        String accessToken = jwtTokenProvider.generateAccessToken(member.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(member.getEmail());

        return new AuthResponse(accessToken, refreshToken);
    }
}