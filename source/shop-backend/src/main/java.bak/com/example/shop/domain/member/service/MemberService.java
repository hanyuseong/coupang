package com.example.shop.domain.member.service;

import com.example.shop.domain.member.dto.MemberDto;
import com.example.shop.domain.member.dto.SignUpRequest;
import com.example.shop.domain.member.dto.LoginRequest;

public interface MemberService {
    MemberDto getMember(Long memberId);
    void updateMember(Long memberId, MemberDto memberDto);
    void signup(SignUpRequest request);
    MemberDto login(LoginRequest request);
}
