package com.example.shop.domain.order.repository;

import com.example.shop.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    Long sumTotalSales();

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.createdAt >= :startOfDay")
    Long sumTodaySales(@Param("startOfDay") LocalDateTime startOfDay);

    long countByCreatedAtAfter(LocalDateTime startOfDay);

    java.util.List<Order> findTop5ByOrderByCreatedAtDesc();

    java.util.List<Order> findAllByCreatedAtAfter(LocalDateTime date);
}
