package com.example.ecom.model;

public class CartItem {

    private Long id;
    private Long productId;
    private int quantity;
    private Product product;

    public CartItem(Long id, Long productId, int quantity, Product product) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
