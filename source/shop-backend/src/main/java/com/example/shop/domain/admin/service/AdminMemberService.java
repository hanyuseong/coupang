package com.example.shop.domain.admin.service;

import com.example.shop.domain.admin.dto.AdminMemberDto;
import com.example.shop.domain.member.entity.Member;
import com.example.shop.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminMemberService {

    private final MemberRepository memberRepository;

    public List<AdminMemberDto> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private AdminMemberDto convertToDto(Member member) {
        return AdminMemberDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .name(member.getName())
                .phone(member.getPhone())
                .status(member.getStatus())
                .createdAt(member.getCreatedAt())
                .build();
    }
}
