package com.example.ecom.controller;

import com.example.ecom.model.Cart;
import com.example.ecom.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{cartId}")
    public Cart getCart(@PathVariable String cartId) {
        System.out.println("CartController: getCart called with cartId: " + cartId);
        return cartService.getCart(cartId);
    }

    @PostMapping("/{cartId}/items")
    public Cart addToCart(@PathVariable String cartId, @RequestBody Map<String, Object> payload) {
        System.out.println("CartController: addToCart called with cartId: " + cartId + ", payload: " + payload);
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());
        return cartService.addToCart(cartId, productId, quantity);
    }

    @PutMapping("/{cartId}/items/{itemId}")
    public Cart updateCartItem(@PathVariable String cartId, @PathVariable Long itemId, @RequestBody Map<String, Object> payload) {
        int quantity = Integer.parseInt(payload.get("quantity").toString());
        return cartService.updateCartItem(cartId, itemId, quantity);
    }

    @DeleteMapping("/{cartId}/items/{itemId}")
    public Cart removeFromCart(@PathVariable String cartId, @PathVariable Long itemId) {
        return cartService.removeFromCart(cartId, itemId);
    }

    @DeleteMapping("/{cartId}")
    public Cart clearCart(@PathVariable String cartId) {
        return cartService.clearCart(cartId);
    }
}
