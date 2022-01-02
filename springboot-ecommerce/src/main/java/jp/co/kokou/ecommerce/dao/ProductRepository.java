package jp.co.kokou.ecommerce.dao;

import jp.co.kokou.ecommerce.entities.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(@Param("categoryId") Long id, Pageable pageable);

    @Query("select p from Product p where p.name like ?1 and p.category.id = ?2")
    List<Product> queryByKeyword(@Param("name") String name, @Param("categoryId") Long id, Pageable pageable);
}