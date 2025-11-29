package com.example.shop.domain.admin.controller;

import com.example.shop.domain.admin.dto.AdminMemberDto;
import com.example.shop.domain.admin.service.AdminMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class AdminMemberController {

    private final AdminMemberService adminMemberService;

    @GetMapping
    public List<AdminMemberDto> getAllMembers() {
        return adminMemberService.getAllMembers();
    }
}
