package com.example.shop.domain.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.shop.domain.cart.entity.Cart;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findFirstByMember_MemberId(Long memberId);

    Optional<Cart> findFirstBySessionId(String sessionId);
}
