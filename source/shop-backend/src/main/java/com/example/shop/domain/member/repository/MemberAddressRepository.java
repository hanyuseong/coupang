package com.example.shop.domain.member.repository;

import com.example.shop.domain.member.entity.MemberAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberAddressRepository extends JpaRepository<MemberAddress, Long> {
    // Custom query methods can be defined here if needed
}