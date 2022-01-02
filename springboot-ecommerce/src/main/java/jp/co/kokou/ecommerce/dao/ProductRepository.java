package jp.co.kokou.ecommerce.dao;

import jp.co.kokou.ecommerce.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p " +
            "WHERE (?1 IS NULL OR p.name LIKE CONCAT('%', ?1, '%')) " +
            "AND (?2 IS NULL OR p.category.id = ?2)"
    )
    Page<Product> queryByKeyword(@Param("keyword") String keyword, @Param("categoryId") Long id, Pageable pageable);
}