package com.example.ecom.repository;

import com.example.ecom.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    

    Optional<Category> findByName(String name);
}
