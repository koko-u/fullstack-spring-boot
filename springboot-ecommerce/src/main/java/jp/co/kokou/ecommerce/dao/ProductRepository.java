package jp.co.kokou.ecommerce.dao;

import jp.co.kokou.ecommerce.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}