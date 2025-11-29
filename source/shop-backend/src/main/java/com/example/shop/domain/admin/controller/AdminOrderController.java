package com.example.shop.domain.admin.controller;

import com.example.shop.domain.admin.dto.AdminOrderDto;
import com.example.shop.domain.admin.service.AdminOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    @GetMapping
    public List<AdminOrderDto> getAllOrders() {
        return adminOrderService.getAllOrders();
    }
}
