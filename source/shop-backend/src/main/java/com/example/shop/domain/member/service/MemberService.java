package com.example.shop.domain.member.service;

import com.example.shop.domain.member.dto.MemberDto;
import com.example.shop.domain.member.dto.SignUpRequest;

public interface MemberService {
    MemberDto getMyInfo();
    void updateMyInfo(MemberDto memberDto);
    MemberDto signUp(SignUpRequest request);
}
