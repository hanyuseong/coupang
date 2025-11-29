package com.example.shop.service;

import com.example.shop.domain.AdminUser;
import com.example.shop.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminUserService {

    private final AdminUserRepository adminUserRepository;

    public List<AdminUser> getAllAdminUsers() {
        return adminUserRepository.findAll();
    }

    @Transactional
    public AdminUser createAdminUser(AdminUser adminUser) {
        return adminUserRepository.save(adminUser);
    }

    @Transactional
    public AdminUser updateAdminUser(Long id, AdminUser adminUserDetails) {
        AdminUser adminUser = adminUserRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("AdminUser not found with id: " + id));

        adminUser.setEmail(adminUserDetails.getEmail());
        if (adminUserDetails.getPassword() != null && !adminUserDetails.getPassword().isEmpty()) {
            adminUser.setPassword(adminUserDetails.getPassword());
        }
        adminUser.setRole(adminUserDetails.getRole());

        return adminUser;
    }

    @Transactional
    public void deleteAdminUser(Long id) {
        adminUserRepository.deleteById(id);
    }
}
