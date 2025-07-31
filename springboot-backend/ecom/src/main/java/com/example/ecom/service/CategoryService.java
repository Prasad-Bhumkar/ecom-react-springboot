
package com.example.ecom.service;

import com.example.ecom.model.Category;
import com.example.ecom.repository.CategoryRepository;
import com.example.ecom.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category categoryData) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        category.setName(categoryData.getName());
        category.setDescription(categoryData.getDescription());
        category.setImage(categoryData.getImage());
        // Save and return updated
        return categoryRepository.save(category);
    }


    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        long productCount = productRepository.countByCategory(category);
        if (productCount > 0) {
            throw new RuntimeException("Cannot delete category with id " + id + " because it has associated products.");
        }

        categoryRepository.deleteById(id);
    }
}
