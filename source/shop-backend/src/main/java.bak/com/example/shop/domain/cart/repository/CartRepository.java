package com.example.shop.domain.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.shop.domain.cart.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    // Additional query methods can be defined here if needed
}
