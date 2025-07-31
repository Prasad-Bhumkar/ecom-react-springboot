package com.example.ecom.repository;

import com.example.ecom.model.Product;
import com.example.ecom.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    

    long countByCategory(Category category);

    List<Product> findTop4ByCategoryAndIdNot(Category category, Long id);
}
