package com.example.shop.domain.member.entity;

import com.example.shop.global.common.BaseEntity;
import com.example.shop.domain.member.enums.MemberStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;
    private String name;
    private String phone;

    // OAuth2 fields
    private String provider;
    private String providerId;

    @Enumerated(EnumType.STRING)
    private MemberStatus status;
}
