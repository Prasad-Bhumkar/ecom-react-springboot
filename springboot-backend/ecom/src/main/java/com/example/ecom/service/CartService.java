package com.example.ecom.service;

import com.example.ecom.model.Cart;
import com.example.ecom.model.CartItem;
import com.example.ecom.model.Product;
import com.example.ecom.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CartService {

    private final Map<String, Cart> carts = new ConcurrentHashMap<>();
    private final ProductRepository productRepository;

    @Autowired
    public CartService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Cart getCart(String cartId) {
        return carts.computeIfAbsent(cartId, id -> new Cart(Long.valueOf(id.hashCode())));
    }

    public Cart addToCart(String cartId, Long productId, int quantity) {
        Cart cart = getCart(cartId);
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                recalculateCart(cart);
                return cart;
            }
        }

        CartItem newItem = new CartItem((long) (cart.getItems().size() + 1), productId, quantity, product);
        cart.getItems().add(newItem);
        recalculateCart(cart);
        return cart;
    }

    public Cart updateCartItem(String cartId, Long itemId, int quantity) {
        Cart cart = getCart(cartId);
        for (CartItem item : cart.getItems()) {
            if (item.getId().equals(itemId)) {
                if (quantity <= 0) {
                    cart.getItems().remove(item);
                } else {
                    item.setQuantity(quantity);
                }
                recalculateCart(cart);
                return cart;
            }
        }
        return cart;
    }

    public Cart removeFromCart(String cartId, Long itemId) {
        Cart cart = getCart(cartId);
        cart.getItems().removeIf(item -> item.getId().equals(itemId));
        recalculateCart(cart);
        return cart;
    }

    public Cart clearCart(String cartId) {
        Cart cart = getCart(cartId);
        cart.getItems().clear();
        recalculateCart(cart);
        return cart;
    }

    private void recalculateCart(Cart cart) {
        int itemCount = 0;
        double total = 0;
        for (CartItem item : cart.getItems()) {
            itemCount += item.getQuantity();
            total += item.getProduct().getPrice() * item.getQuantity();
        }
        cart.setItemCount(itemCount);
        cart.setTotal(total);
    }
}
