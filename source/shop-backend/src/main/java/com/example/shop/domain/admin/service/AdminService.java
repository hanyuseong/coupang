package com.example.shop.domain.admin.service;

import com.example.shop.domain.admin.dto.AdminDto;

public interface AdminService {
    void createProduct(AdminDto adminDto);
    void updateProduct(Long productId, AdminDto adminDto);
    void deleteProduct(Long productId);
    // Additional admin-related methods can be defined here
}