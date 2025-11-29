package com.example.shop.domain.admin.controller;

import com.example.shop.domain.admin.dto.AdminDashboardDto;
import com.example.shop.domain.admin.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping("/stats")
    public AdminDashboardDto getDashboardStats() {
        return adminDashboardService.getDashboardStats();
    }
}
