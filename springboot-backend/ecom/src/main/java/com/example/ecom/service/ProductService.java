package com.example.ecom.service;

import com.example.ecom.model.Product;
import com.example.ecom.repository.ProductRepository;
import com.example.ecom.dto.ProductDTO;
import com.example.ecom.exception.ResourceNotFoundException;
import com.example.ecom.model.Category;
import com.example.ecom.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(this::convertToDto);
    }

    public Page<ProductDTO> getAllProducts(Long categoryId, String search, Double minPrice, Double maxPrice, Pageable pageable) {
        Specification<Product> spec = (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();

        if (categoryId != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("category").get("id"), categoryId));
        }

        if (search != null && !search.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + search.toLowerCase() + "%"));
        }

        if (minPrice != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        if (maxPrice != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        return productRepository.findAll(spec, pageable).map(this::convertToDto);
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return convertToDto(product);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        if (productDTO.getCategoryId() == null) {
            throw new IllegalArgumentException("Category ID must be provided for product creation.");
        }
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setImage(productDTO.getImage());
        product.setRating(productDTO.getRating());
        product.setReviews(productDTO.getReviews());
        product.setBrand(productDTO.getBrand());
        product.setStock(productDTO.getStock());
        // Optionally update category if needed
        if (productDTO.getCategoryId() != null) {
            Optional<Category> categoryOpt = categoryRepository.findById(productDTO.getCategoryId());
            if (categoryOpt.isPresent()) {
                product.setCategory(categoryOpt.get());
            } else {
                throw new ResourceNotFoundException("Category not found with id: " + productDTO.getCategoryId());
            }
        }
        // Save and return updated DTO
        productRepository.save(product);
        return convertToDto(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<ProductDTO> getRelatedProducts(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        List<Product> relatedProducts = productRepository.findTop4ByCategoryAndIdNot(product.getCategory(), id);
        return relatedProducts.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setImage(productDTO.getImage());
        product.setRating(productDTO.getRating());
        product.setReviews(productDTO.getReviews());
        product.setBrand(productDTO.getBrand());
        product.setStock(productDTO.getStock());
        // Set category if needed
        if (productDTO.getCategoryId() != null) {
            Optional<Category> categoryOpt = categoryRepository.findById(productDTO.getCategoryId());
            if (categoryOpt.isPresent()) {
                product.setCategory(categoryOpt.get());
            } else {
                throw new ResourceNotFoundException("Category not found with id: " + productDTO.getCategoryId());
            }
        }
        return product;
    }

    private ProductDTO convertToDto(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setImage(product.getImage());
        productDTO.setRating(product.getRating());
        productDTO.setReviews(product.getReviews());
        productDTO.setBrand(product.getBrand());
        productDTO.setStock(product.getStock());
        if (product.getCategory() != null) {
            productDTO.setCategoryId(product.getCategory().getId());
            productDTO.setCategoryName(product.getCategory().getName());
        }
        return productDTO;
    }
}
