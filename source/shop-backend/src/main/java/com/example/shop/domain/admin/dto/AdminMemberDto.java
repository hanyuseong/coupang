package com.example.shop.domain.admin.dto;

import com.example.shop.domain.member.enums.MemberStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminMemberDto {
    private Long memberId;
    private String email;
    private String name;
    private String phone;
    private MemberStatus status;
    private LocalDateTime createdAt;
}
