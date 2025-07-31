# Spring Boot E-Commerce Backend - Complete Architecture Plan
cd springboot-backend/ecom ; ./mvnw spring-boot:run
## Project Overview
This document outlines the complete Spring Boot backend architecture for the ShopFusion e-commerce platform, including folder structure, entities, repositories, services, controllers, and configuration.

## Technology Stack
- **Framework**: Spring Boot 3.2.x
- **Database**: PostgreSQL 15+ (primary), H2 (testing)
- **Security**: Spring Security 6.x with JWT
- **Data Access**: Spring Data JPA, Hibernate
- **Documentation**: OpenAPI 3 (Swagger)
- **Testing**: JUnit 5, Mockito, TestContainers
- **Build Tool**: Maven
- **Java Version**: JDK 17+

## Project Structure

```
shopfusion-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── shopfusion/
│   │   │           ├── ShopFusionApplication.java
│   │   │           ├── config/
│   │   │           │   ├── CorsConfig.java
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   ├── JwtConfig.java
│   │   │           │   ├── SwaggerConfig.java
│   │   │           │   └── DatabaseConfig.java
│   │   │           ├── controller/
│   │   │           │   ├── ProductController.java
│   │   │           │   ├── CategoryController.java
│   │   │           │   ├── UserController.java
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── CartController.java
│   │   │           │   ├── OrderController.java
│   │   │           │   ├── ReviewController.java
│   │   │           │   └── AdminController.java
│   │   │           ├── dto/
│   │   │           │   ├── request/
│   │   │           │   │   ├── ProductCreateRequest.java
│   │   │           │   │   ├── ProductUpdateRequest.java
│   │   │           │   │   ├── UserRegistrationRequest.java
│   │   │           │   │   ├── LoginRequest.java
│   │   │           │   │   ├── CartItemRequest.java
│   │   │           │   │   ├── OrderCreateRequest.java
│   │   │           │   │   └── ReviewCreateRequest.java
│   │   │           │   ├── response/
│   │   │           │   │   ├── ProductResponse.java
│   │   │           │   │   ├── ProductDetailResponse.java
│   │   │           │   │   ├── CategoryResponse.java
│   │   │           │   │   ├── UserResponse.java
│   │   │           │   │   ├── AuthResponse.java
│   │   │           │   │   ├── CartResponse.java
│   │   │           │   │   ├── OrderResponse.java
│   │   │           │   │   ├── OrderDetailResponse.java
│   │   │           │   │   ├── ReviewResponse.java
│   │   │           │   │   ├── ApiResponse.java
│   │   │           │   │   └── PaginatedResponse.java
│   │   │           │   └── common/
│   │   │           │       ├── ProductFilters.java
│   │   │           │       └── SortCriteria.java
│   │   │           ├── entity/
│   │   │           │   ├── Product.java
│   │   │           │   ├── Category.java
│   │   │           │   ├── User.java
│   │   │           │   ├── Role.java
│   │   │           │   ├── Cart.java
│   │   │           │   ├── CartItem.java
│   │   │           │   ├── Order.java
│   │   │           │   ├── OrderItem.java
│   │   │           │   ├── Review.java
│   │   │           │   ├── ProductSpecification.java
│   │   │           │   └── BaseEntity.java
│   │   │           ├── repository/
│   │   │           │   ├── ProductRepository.java
│   │   │           │   ├── CategoryRepository.java
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── RoleRepository.java
│   │   │           │   ├── CartRepository.java
│   │   │           │   ├── CartItemRepository.java
│   │   │           │   ├── OrderRepository.java
│   │   │           │   ├── OrderItemRepository.java
│   │   │           │   ├── ReviewRepository.java
│   │   │           │   └── ProductSpecificationRepository.java
│   │   │           ├── service/
│   │   │           │   ├── ProductService.java
│   │   │           │   ├── CategoryService.java
│   │   │           │   ├── UserService.java
│   │   │           │   ├── AuthService.java
│   │   │           │   ├── CartService.java
│   │   │           │   ├── OrderService.java
│   │   │           │   ├── ReviewService.java
│   │   │           │   ├── EmailService.java
│   │   │           │   ├── FileStorageService.java
│   │   │           │   └── JwtService.java
│   │   │           ├── security/
│   │   │           │   ├── JwtAuthenticationEntryPoint.java
│   │   │           │   ├── JwtAuthenticationFilter.java
│   │   │           │   ├── UserPrincipal.java
│   │   │           │   └── CustomUserDetailsService.java
│   │   │           ├── exception/
│   │   │           │   ├── GlobalExceptionHandler.java
│   │   │           │   ├── ResourceNotFoundException.java
│   │   │           │   ├── BadRequestException.java
│   │   │           │   ├── UnauthorizedException.java
│   │   │           │   └── InsufficientStockException.java
│   │   │           └── util/
│   │   │               ├── Constants.java
│   │   │               ├── ModelMapperUtil.java
│   │   │               ├── ValidationUtil.java
│   │   │               └── PaginationUtil.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       ├── data.sql (sample data)
│   │       └── schema.sql (initial schema)
│   └── test/
│       └── java/
│           └── com/
│               └── shopfusion/
│                   ├── controller/
│                   │   ├── ProductControllerTest.java
│                   │   ├── UserControllerTest.java
│                   │   ├── AuthControllerTest.java
│                   │   └── CartControllerTest.java
│                   ├── service/
│                   │   ├── ProductServiceTest.java
│                   │   ├── UserServiceTest.java
│                   │   ├── AuthServiceTest.java
│                   │   └── CartServiceTest.java
│                   └── repository/
│                       ├── ProductRepositoryTest.java
│                       ├── UserRepositoryTest.java
│                       └── CartRepositoryTest.java
├── pom.xml
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Entity Definitions

### 1. BaseEntity.java
```java
@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @Version
    private Long version;
}
```

### 2. Product.java
```java
@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_product_category", columnList = "category_id"),
    @Index(name = "idx_product_price", columnList = "price"),
    @Index(name = "idx_product_name", columnList = "name")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Product extends BaseEntity {
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(length = 500)
    private String imageUrl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @Column(nullable = false)
    private Integer stock = 0;
    
    @Column(length = 100)
    private String brand;
    
    @Column(precision = 2, scale = 1)
    private BigDecimal rating = BigDecimal.ZERO;
    
    @Column
    private Integer reviewCount = 0;
    
    @Column
    private Boolean active = true;
    
    @Column(length = 100)
    private String sku;
    
    @Column(precision = 10, scale = 3)
    private BigDecimal weight;
    
    @Column(length = 50)
    private String dimensions;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductSpecification> specifications = new ArrayList<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItems = new ArrayList<>();
}
```

### 3. Category.java
```java
@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Category extends BaseEntity {
    @Column(nullable = false, unique = true, length = 100)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 500)
    private String imageUrl;
    
    @Column(unique = true, length = 100)
    private String slug;
    
    @Column
    private Boolean active = true;
    
    @Column
    private Integer sortOrder = 0;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Product> products = new ArrayList<>();
}
```

### 4. User.java
```java
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_email", columnList = "email"),
    @Index(name = "idx_user_username", columnList = "username")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {
    @Column(nullable = false, unique = true, length = 100)
    private String username;
    
    @Column(nullable = false, unique = true, length = 255)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(length = 100)
    private String firstName;
    
    @Column(length = 100)
    private String lastName;
    
    @Column(length = 20)
    private String phoneNumber;
    
    @Column
    private LocalDate dateOfBirth;
    
    @Column
    private Boolean emailVerified = false;
    
    @Column
    private Boolean active = true;
    
    @Column
    private LocalDateTime lastLoginAt;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Cart cart;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();
}
```

### 5. Role.java
```java
@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Role extends BaseEntity {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleName name;
    
    @Column
    private String description;
    
    public enum RoleName {
        ROLE_USER,
        ROLE_ADMIN,
        ROLE_MODERATOR
    }
}
```

### 6. Cart.java
```java
@Entity
@Table(name = "carts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Cart extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> items = new ArrayList<>();
    
    @Column(precision = 10, scale = 2)
    private BigDecimal totalAmount = BigDecimal.ZERO;
    
    @Column
    private Integer totalItems = 0;
    
    public void calculateTotals() {
        this.totalAmount = items.stream()
            .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        this.totalItems = items.stream()
            .mapToInt(CartItem::getQuantity)
            .sum();
    }
}
```

### 7. CartItem.java
```java
@Entity
@Table(name = "cart_items", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"cart_id", "product_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CartItem extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal unitPrice;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal totalPrice;
    
    @PrePersist
    @PreUpdate
    public void calculateTotalPrice() {
        if (product != null && quantity != null) {
            this.unitPrice = product.getPrice();
            this.totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));
        }
    }
}
```

### 8. Order.java
```java
@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_order_user", columnList = "user_id"),
    @Index(name = "idx_order_status", columnList = "status"),
    @Index(name = "idx_order_date", columnList = "order_date")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Order extends BaseEntity {
    @Column(unique = true, length = 50)
    private String orderNumber;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private LocalDateTime orderDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PENDING;
    
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal subtotal;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal taxAmount = BigDecimal.ZERO;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal shippingCost = BigDecimal.ZERO;
    
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal totalAmount;
    
    @Column(length = 255)
    private String shippingAddress;
    
    @Column(length = 255)
    private String billingAddress;
    
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    
    @Column(length = 255)
    private String paymentTransactionId;
    
    @Column
    private LocalDateTime shippedDate;
    
    @Column
    private LocalDateTime deliveredDate;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();
    
    public enum OrderStatus {
        PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED
    }
    
    public enum PaymentMethod {
        CREDIT_CARD, DEBIT_CARD, PAYPAL, BANK_TRANSFER, CASH_ON_DELIVERY
    }
    
    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED, CANCELLED
    }
}
```

### 9. OrderItem.java
```java
@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class OrderItem extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal unitPrice;
    
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal totalPrice;
    
    @Column(length = 255)
    private String productName; // Snapshot at time of purchase
    
    @Column(length = 500)
    private String productDescription; // Snapshot at time of purchase
}
```

### 10. Review.java
```java
@Entity
@Table(name = "reviews", indexes = {
    @Index(name = "idx_review_product", columnList = "product_id"),
    @Index(name = "idx_review_user", columnList = "user_id"),
    @Index(name = "idx_review_rating", columnList = "rating")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Review extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private Integer rating; // 1-5 stars
    
    @Column(length = 255)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String comment;
    
    @Column
    private Boolean verified = false; // Verified purchase
    
    @Column
    private Boolean approved = true;
    
    @Column
    private Integer helpfulVotes = 0;
}
```

### 11. ProductSpecification.java
```java
@Entity
@Table(name = "product_specifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ProductSpecification extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false, length = 255)
    private String value;
    
    @Column
    private Integer sortOrder = 0;
}
```

## Controller Definitions

### 1. ProductController.java
```java
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
@Validated
@Tag(name = "Products", description = "Product management APIs")
public class ProductController {
    
    // GET /api/products - Get all products with pagination and filtering
    @GetMapping
    public ResponseEntity<PaginatedResponse<ProductResponse>> getAllProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "12") int size,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) BigDecimal minPrice,
        @RequestParam(required = false) BigDecimal maxPrice,
        @RequestParam(defaultValue = "name") String sortBy,
        @RequestParam(defaultValue = "asc") String sortOrder
    );
    
    // GET /api/products/{id} - Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDetailResponse>> getProductById(@PathVariable Long id);
    
    // POST /api/products - Create new product (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(@Valid @RequestBody ProductCreateRequest request);
    
    // PUT /api/products/{id} - Update product (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
        @PathVariable Long id, 
        @Valid @RequestBody ProductUpdateRequest request
    );
    
    // DELETE /api/products/{id} - Delete product (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable Long id);
    
    // GET /api/products/{id}/reviews - Get product reviews
    @GetMapping("/{id}/reviews")
    public ResponseEntity<PaginatedResponse<ReviewResponse>> getProductReviews(
        @PathVariable Long id,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    );
    
    // GET /api/products/featured - Get featured products
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getFeaturedProducts();
    
    // GET /api/products/search - Advanced search
    @GetMapping("/search")
    public ResponseEntity<PaginatedResponse<ProductResponse>> searchProducts(
        @RequestParam String query,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "12") int size
    );
}
```

### 2. CategoryController.java
```java
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
@Tag(name = "Categories", description = "Category management APIs")
public class CategoryController {
    
    // GET /api/categories - Get all categories
    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories();
    
    // GET /api/categories/{id} - Get category by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(@PathVariable Long id);
    
    // GET /api/categories/{id}/products - Get products by category
    @GetMapping("/{id}/products")
    public ResponseEntity<PaginatedResponse<ProductResponse>> getProductsByCategory(
        @PathVariable Long id,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "12") int size,
        @RequestParam(defaultValue = "name") String sortBy,
        @RequestParam(defaultValue = "asc") String sortOrder
    );
    
    // POST /api/categories - Create category (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@Valid @RequestBody CategoryCreateRequest request);
    
    // PUT /api/categories/{id} - Update category (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
        @PathVariable Long id, 
        @Valid @RequestBody CategoryUpdateRequest request
    );
    
    // DELETE /api/categories/{id} - Delete category (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteCategory(@PathVariable Long id);
}
```

### 3. AuthController.java
```java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Authentication", description = "Authentication APIs")
public class AuthController {
    
    // POST /api/auth/register - User registration
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody UserRegistrationRequest request);
    
    // POST /api/auth/login - User login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request);
    
    // POST /api/auth/refresh - Refresh JWT token
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@RequestBody RefreshTokenRequest request);
    
    // POST /api/auth/logout - User logout
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletRequest request);
    
    // POST /api/auth/forgot-password - Request password reset
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request);
    
    // POST /api/auth/reset-password - Reset password
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request);
    
    // POST /api/auth/verify-email - Verify email address
    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<String>> verifyEmail(@RequestParam String token);
}
```

### 4. UserController.java
```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@Tag(name = "Users", description = "User management APIs")
public class UserController {
    
    // GET /api/users/me - Get current user profile
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(Authentication authentication);
    
    // PUT /api/users/me - Update current user profile
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateCurrentUser(
        @Valid @RequestBody UserUpdateRequest request,
        Authentication authentication
    );
    
    // GET /api/users/{id} - Get user by ID (Admin only)
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id);
    
    // GET /api/users - Get all users (Admin only)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PaginatedResponse<UserResponse>> getAllUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String search
    );
    
    // PUT /api/users/{id}/status - Update user status (Admin only)
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> updateUserStatus(
        @PathVariable Long id,
        @RequestBody UserStatusUpdateRequest request
    );
    
    // DELETE /api/users/me - Delete current user account
    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse<String>> deleteCurrentUser(Authentication authentication);
}
```

### 5. CartController.java
```java
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
@Tag(name = "Shopping Cart", description = "Shopping cart management APIs")
public class CartController {
    
    // GET /api/cart - Get current user's cart
    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(Authentication authentication);
    
    // POST /api/cart/items - Add item to cart
    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addToCart(
        @Valid @RequestBody CartItemRequest request,
        Authentication authentication
    );
    
    // PUT /api/cart/items/{itemId} - Update cart item quantity
    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateCartItem(
        @PathVariable Long itemId,
        @Valid @RequestBody CartItemUpdateRequest request,
        Authentication authentication
    );
    
    // DELETE /api/cart/items/{itemId} - Remove item from cart
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartResponse>> removeFromCart(
        @PathVariable Long itemId,
        Authentication authentication
    );
    
    // DELETE /api/cart - Clear entire cart
    @DeleteMapping
    public ResponseEntity<ApiResponse<String>> clearCart(Authentication authentication);
    
    // GET /api/cart/count - Get cart item count
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Integer>> getCartItemCount(Authentication authentication);
}
```

### 6. OrderController.java
```java
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
@Tag(name = "Orders", description = "Order management APIs")
public class OrderController {
    
    // POST /api/orders - Create new order (checkout)
    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
        @Valid @RequestBody OrderCreateRequest request,
        Authentication authentication
    );
    
    // GET /api/orders - Get user's orders
    @GetMapping
    public ResponseEntity<PaginatedResponse<OrderResponse>> getUserOrders(
        Authentication authentication,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    );
    
    // GET /api/orders/{id} - Get order details
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDetailResponse>> getOrderById(
        @PathVariable Long id,
        Authentication authentication
    );
    
    // PUT /api/orders/{id}/cancel - Cancel order
    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<String>> cancelOrder(
        @PathVariable Long id,
        Authentication authentication
    );
    
    // GET /api/orders/admin - Get all orders (Admin only)
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PaginatedResponse<OrderResponse>> getAllOrders(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String status
    );
    
    // PUT /api/orders/{id}/status - Update order status (Admin only)
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> updateOrderStatus(
        @PathVariable Long id,
        @RequestBody OrderStatusUpdateRequest request
    );
}
```

### 7. ReviewController.java
```java
@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
@Tag(name = "Reviews", description = "Product review APIs")
public class ReviewController {
    
    // POST /api/reviews - Create product review
    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(
        @Valid @RequestBody ReviewCreateRequest request,
        Authentication authentication
    );
    
    // PUT /api/reviews/{id} - Update review
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ReviewResponse>> updateReview(
        @PathVariable Long id,
        @Valid @RequestBody ReviewUpdateRequest request,
        Authentication authentication
    );
    
    // DELETE /api/reviews/{id} - Delete review
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteReview(
        @PathVariable Long id,
        Authentication authentication
    );
    
    // GET /api/reviews/user - Get user's reviews
    @GetMapping("/user")
    public ResponseEntity<PaginatedResponse<ReviewResponse>> getUserReviews(
        Authentication authentication,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    );
    
    // PUT /api/reviews/{id}/helpful - Mark review as helpful
    @PutMapping("/{id}/helpful")
    public ResponseEntity<ApiResponse<String>> markReviewHelpful(
        @PathVariable Long id,
        Authentication authentication
    );
}
```

## Service Layer Methods

### ProductService.java
```java
@Service
@Transactional
public class ProductService {
    
    // Core CRUD operations
    public PaginatedResponse<ProductResponse> getAllProducts(ProductFilters filters, Pageable pageable);
    public ProductDetailResponse getProductById(Long id);
    public ProductResponse createProduct(ProductCreateRequest request);
    public ProductResponse updateProduct(Long id, ProductUpdateRequest request);
    public void deleteProduct(Long id);
    
    // Business logic methods
    public List<ProductResponse> getFeaturedProducts();
    public PaginatedResponse<ProductResponse> searchProducts(String query, Pageable pageable);
    public PaginatedResponse<ProductResponse> getProductsByCategory(Long categoryId, Pageable pageable);
    public void updateProductRating(Long productId);
    public boolean isProductAvailable(Long productId, Integer quantity);
    public void decreaseStock(Long productId, Integer quantity);
    public void increaseStock(Long productId, Integer quantity);
    
    // Helper methods
    private ProductResponse mapToResponse(Product product);
    private ProductDetailResponse mapToDetailResponse(Product product);
    private Product mapToEntity(ProductCreateRequest request);
    private void updateProductFromRequest(Product product, ProductUpdateRequest request);
}
```

### CartService.java
```java
@Service
@Transactional
public class CartService {
    
    // Core cart operations
    public CartResponse getOrCreateCart(Long userId);
    public CartResponse addToCart(Long userId, CartItemRequest request);
    public CartResponse updateCartItem(Long userId, Long itemId, Integer quantity);
    public CartResponse removeFromCart(Long userId, Long itemId);
    public void clearCart(Long userId);
    public Integer getCartItemCount(Long userId);
    
    // Business logic methods
    public void validateCartItem(Long productId, Integer quantity);
    public BigDecimal calculateCartTotal(List<CartItem> items);
    public void syncCartWithStock(Cart cart);
    public CartResponse mergeGuestCart(Long userId, List<CartItemRequest> guestItems);
    
    // Helper methods
    private CartResponse mapToResponse(Cart cart);
    private void recalculateCartTotals(Cart cart);
}
```

## Configuration Classes

### SecurityConfig.java
```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder();
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config);
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http);
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource();
    
    @Bean
    public JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint();
    
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter();
}
```

### SwaggerConfig.java
```java
@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "ShopFusion E-commerce API",
        version = "1.0",
        description = "Complete e-commerce platform REST API"
    ),
    servers = {
        @Server(url = "http://localhost:8080", description = "Development server"),
        @Server(url = "https://api.shopfusion.com", description = "Production server")
    }
)
@SecurityScheme(
    name = "Bearer Authentication",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer"
)
public class SwaggerConfig {
    // Configuration for OpenAPI documentation
}
```

## Repository Layer

### ProductRepository.java
```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Custom query methods
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    List<Product> findTop8ByOrderByCreatedAtDesc();
    List<Product> findTop8ByOrderByRatingDesc();
    
    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR p.category.id = :category) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Product> findWithFilters(@Param("category") Long category,
                                  @Param("minPrice") BigDecimal minPrice,
                                  @Param("maxPrice") BigDecimal maxPrice,
                                  @Param("search") String search,
                                  Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.stock < :threshold")
    List<Product> findLowStockProducts(@Param("threshold") Integer threshold);
    
    @Modifying
    @Query("UPDATE Product p SET p.stock = p.stock - :quantity WHERE p.id = :id AND p.stock >= :quantity")
    int decreaseStock(@Param("id") Long id, @Param("quantity") Integer quantity);
    
    @Modifying
    @Query("UPDATE Product p SET p.rating = :rating, p.reviewCount = :count WHERE p.id = :id")
    void updateRatingAndReviewCount(@Param("id") Long id, @Param("rating") BigDecimal rating, @Param("count") Integer count);
}
```

## Application Configuration

### application.yml
```yaml
spring:
  application:
    name: shopfusion-backend
  
  profiles:
    active: dev
  
  datasource:
    url: jdbc:postgresql://localhost:5432/shopfusion
    username: ${DB_USERNAME:shopfusion}
    password: ${DB_PASSWORD:password}
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
        use_sql_comments: true
  
  liquibase:
    change-log: classpath:db/changelog/db.changelog-master.xml
  
  security:
    jwt:
      secret: ${JWT_SECRET:mySecretKey}
      expiration: 86400000 # 24 hours
      refresh-expiration: 604800000 # 7 days
  
  mail:
    host: ${MAIL_HOST:smtp.gmail.com}
    port: ${MAIL_PORT:587}
    username: ${MAIL_USERNAME:}
    password: ${MAIL_PASSWORD:}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized

logging:
  level:
    com.shopfusion: INFO
    org.springframework.security: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"

server:
  port: 8080
  servlet:
    context-path: /api
```

## Key Features Implemented

1. **Complete Product Catalog System**
   - Full CRUD operations for products and categories
   - Advanced search and filtering capabilities
   - Product specifications and reviews
   - Inventory management with stock tracking

2. **User Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control (USER, ADMIN, MODERATOR)
   - Password reset and email verification
   - Secure user profile management

3. **Shopping Cart & Order Management**
   - Persistent shopping cart per user
   - Real-time cart calculations
   - Complete order lifecycle management
   - Order history and tracking

4. **Review System**
   - Product reviews and ratings
   - Verified purchase reviews
   - Helpful vote system
   - Moderation capabilities

5. **Admin Features**
   - Product and category management
   - User management
   - Order management and status updates
   - Inventory tracking and alerts

6. **Security & Performance**
   - Comprehensive input validation
   - SQL injection prevention
   - Pagination for large datasets
   - Database indexing for performance
   - Audit trails with created/updated timestamps

This architecture provides a robust, scalable foundation for the ShopFusion e-commerce platform with enterprise-grade features and security measures.
