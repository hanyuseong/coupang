package com.example.shop.controller;

import com.example.shop.domain.AdminUser;
import com.example.shop.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001") // Allow frontend access
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    // @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public List<AdminUser> getAllAdminUsers() {
        return adminUserService.getAllAdminUsers();
    }

    @PostMapping
    // @PreAuthorize("hasRole('ADMIN')")
    public AdminUser createAdminUser(@RequestBody AdminUser adminUser) {
        return adminUserService.createAdminUser(adminUser);
    }

    @PutMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public AdminUser updateAdminUser(@PathVariable Long id, @RequestBody AdminUser adminUser) {
        return adminUserService.updateAdminUser(id, adminUser);
    }

    @DeleteMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAdminUser(@PathVariable Long id) {
        adminUserService.deleteAdminUser(id);
        return ResponseEntity.ok().build();
    }
}
