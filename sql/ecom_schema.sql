-- Create the database
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- category table
CREATE TABLE category (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    product_count INT DEFAULT 0
);



-- product table with JSON specifications
CREATE TABLE product (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    category_id BIGINT NOT NULL,
    stock INT DEFAULT 0,
    rating DECIMAL(2,1),
    reviews INT DEFAULT 0,
    brand VARCHAR(100),
    specifications JSON,
    FOREIGN KEY (category_id) REFERENCES category(id)
);



-- Insert statements for category table
INSERT INTO category (id, name, description, image, product_count) VALUES
(1, 'Electronics', 'Latest gadgets and electronic devices', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop', 10),
(2, 'Clothing', 'Fashion and apparel for all occasions', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop', 10),
(3, 'Home & Garden', 'Everything for your home and garden', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', 10),
(4, 'Sports & Fitness', 'Sports equipment and fitness gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop', 10),
(5, 'Books', 'Books, magazines, and educational materials', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop', 10);

-- Insert statements for product table
INSERT INTO product (id, name, description, price, image, category_id, stock, rating, reviews, brand, specifications) VALUES
(1, 'iPhone 15 Pro', 'Latest iPhone with advanced features and titanium build', 999.99, 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=400&h=400&fit=crop', 1, 50, 4.8, 1250, 'Apple', '{"Storage":"128GB","Display":"6.1-inch","Camera":"48MP"}'),
(2, 'Samsung Galaxy S24', 'Flagship Android phone with AI features', 899.99, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop', 1, 35, 4.7, 980, 'Samsung', '{"Storage":"256GB","Display":"6.2-inch","Camera":"50MP"}'),
(3, 'MacBook Air M3', 'Ultra-thin laptop with M3 chip and all-day battery', 1299.99, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop', 1, 25, 4.9, 750, 'Apple', '{"Processor":"M3","RAM":"8GB","Storage":"256GB"}'),
(4, 'Sony WH-1000XM5', 'Premium noise-canceling headphones', 349.99, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop', 1, 100, 4.6, 2100, 'Sony', '{"Type":"Over-ear","Wireless":"Yes","Battery":"30 hours"}'),
(5, 'Nintendo Switch OLED', 'Gaming console with vibrant OLED display', 349.99, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop', 1, 75, 4.7, 1500, 'Nintendo', '{"Display":"7-inch OLED","Storage":"64GB","Type":"Handheld/Docked"}'),
(6, 'iPad Pro 12.9"', 'Professional tablet with M2 chip', 1099.99, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', 1, 40, 4.8, 650, 'Apple', '{"Display":"12.9-inch","Processor":"M2","Storage":"128GB"}'),
(7, 'Canon EOS R6 Mark II', 'Mirrorless camera for professionals', 2499.99, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop', 1, 15, 4.9, 300, 'Canon', '{"Resolution":"24MP","Video":"4K 60fps","Type":"Mirrorless"}'),
(8, 'LG OLED55C3PUA', '55" OLED 4K Smart TV with AI', 1799.99, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', 1, 20, 4.7, 850, 'LG', '{"Size":"55-inch","Resolution":"4K OLED","Smart TV":"webOS"}'),
(9, 'Apple Watch Series 9', 'Advanced smartwatch with health monitoring', 399.99, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop', 1, 80, 4.6, 1800, 'Apple', '{"Display":"45mm","Battery":"18 hours","Health":"ECG, Blood O2"}'),
(10, 'Bose SoundLink Revolve+', 'Portable Bluetooth speaker with 360° sound', 199.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', 1, 60, 4.5, 1200, 'Bose', '{"Battery":"16 hours","Connectivity":"Bluetooth","Water Resistant":"IPX4"}'),
(11, 'Levi 501 Original Jeans', 'Classic straight-leg jeans in vintage wash', 89.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', 2, 150, 4.4, 2500, 'Levis', '{"Fit":"Straight","Material":"100% Cotton","Wash":"Medium Blue"}'),
(12, 'Nike Air Force 1', 'Iconic basketball shoes in white leather', 110.00, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 2, 200, 4.6, 3200, 'Nike', '{"Type":"Basketball","Material":"Leather","Color":"White"}'),
(13, 'Patagonia Houdini Jacket', 'Lightweight windbreaker for outdoor activities', 149.99, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop', 2, 75, 4.7, 850, 'Patagonia', '{"Type":"Windbreaker","Material":"Recycled Nylon","Weight":"92g"}'),
(14, 'Uniqlo Merino Wool Sweater', 'Premium merino wool crew neck sweater', 59.99, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop', 2, 120, 4.5, 1500, 'Uniqlo', '{"Material":"100% Merino Wool","Fit":"Regular","Care":"Hand Wash"}'),
(15, 'Ray-Ban Aviator Sunglasses', 'Classic aviator sunglasses with polarized lenses', 199.99, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', 2, 90, 4.8, 2800, 'Ray-Ban', '{"Lens":"Polarized","Frame":"Metal","UV Protection":"100%"}'),
(16, 'Adidas Ultraboost 22', 'High-performance running shoes with Boost technology', 180.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 2, 85, 4.6, 1900, 'Adidas', '{"Type":"Running","Technology":"Boost","Upper":"Primeknit"}'),
(17, 'H&M Organic Cotton T-Shirt', 'Sustainable basic t-shirt in organic cotton', 12.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', 2, 300, 4.2, 5000, 'H&M', '{"Material":"Organic Cotton","Fit":"Regular","Sustainable":"Yes"}'),
(18, 'Zara Wool Blend Coat', 'Elegant wool blend coat for winter', 129.99, 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop', 2, 45, 4.4, 650, 'Zara', '{"Material":"Wool Blend","Season":"Winter","Length":"Mid-length"}'),
(19, 'Champion Reverse Weave Hoodie', 'Classic pullover hoodie in heavyweight cotton', 65.00, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', 2, 110, 4.5, 1200, 'Champion', '{"Material":"Cotton Blend","Type":"Pullover","Weight":"Heavyweight"}'),
(20, 'Timberland 6-Inch Boots', 'Waterproof leather boots for all seasons', 199.99, 'https://images.unsplash.com/photo-1544966503-7cc22e1d2c2e?w=400&h=400&fit=crop', 2, 70, 4.7, 1800, 'Timberland', '{"Material":"Leather","Waterproof":"Yes","Height":"6 inches"}');