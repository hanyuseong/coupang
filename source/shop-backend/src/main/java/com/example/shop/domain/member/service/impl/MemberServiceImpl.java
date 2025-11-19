package com.example.shop.domain.member.service.impl;

import com.example.shop.domain.member.dto.MemberDto;
import com.example.shop.domain.member.dto.SignUpRequest;
import com.example.shop.domain.member.entity.Member;
import com.example.shop.domain.member.enums.MemberStatus;
import com.example.shop.domain.member.repository.MemberRepository;
import com.example.shop.domain.member.service.MemberService;
import com.example.shop.global.exception.BusinessException;
import com.example.shop.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public MemberDto getMyInfo() {
        return memberRepository.findAll().stream()
                .findFirst()
                .map(this::toDto)
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND));
    }

    @Override
    @Transactional
    public void updateMyInfo(MemberDto memberDto) {
        Member member = memberRepository.findById(memberDto.getMemberId())
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND));

        member.setName(memberDto.getName());
        member.setPhone(memberDto.getPhone());
        if (memberDto.getStatus() != null) {
            member.setStatus(MemberStatus.valueOf(memberDto.getStatus()));
        }
    }

    @Override
    @Transactional
    public MemberDto signUp(SignUpRequest request) {
        if (memberRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        Member member = Member.builder()
                .email(request.getEmail())
                .password(request.getPassword()) // Password should be encoded
                .name(request.getName())
                .phone(request.getPhone())
                .status(MemberStatus.ACTIVE)
                .build();

        return toDto(memberRepository.save(member));
    }

    private MemberDto toDto(Member member) {
        return MemberDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .name(member.getName())
                .phone(member.getPhone())
                .status(member.getStatus() != null ? member.getStatus().name() : null)
                .build();
    }
}
