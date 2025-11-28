-- SQL statements for initializing the database schema

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS review_image;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS lightning_deal;
DROP TABLE IF EXISTS recommended_keyword;
DROP TABLE IF EXISTS admin_user;
DROP TABLE IF EXISTS banner;
DROP TABLE IF EXISTS point_history;
DROP TABLE IF EXISTS member_coupon;
DROP TABLE IF EXISTS coupon;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS order_delivery;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS order_info;
DROP TABLE IF EXISTS cart_item;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS product_qna;
DROP TABLE IF EXISTS product_image;
DROP TABLE IF EXISTS product_option_stock;
DROP TABLE IF EXISTS product_option;
DROP TABLE IF EXISTS product_option_group;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS member_social;
DROP TABLE IF EXISTS member_address;
DROP TABLE IF EXISTS member;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Member Table
CREATE TABLE member (
    member_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50),
    phone VARCHAR(20),
    status ENUM('ACTIVE', 'INACTIVE', 'DELETED') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Member Address Table
CREATE TABLE member_address (
    address_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT,
    receiver_name VARCHAR(50),
    receiver_phone VARCHAR(20),
    zipcode VARCHAR(10),
    addr1 VARCHAR(255),
    addr2 VARCHAR(255),
    is_default TINYINT(1),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

-- 3. Member Social Table
CREATE TABLE member_social (
    social_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT,
    provider ENUM('kakao', 'naver', 'google', 'apple'),
    provider_id VARCHAR(255),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

-- 4. Category Table
CREATE TABLE category (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT NULL,
    name VARCHAR(100),
    depth INT,
    sort_order INT,
    FOREIGN KEY (parent_id) REFERENCES category(category_id)
);

-- 5. Product Table
CREATE TABLE product (
    product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT,
    name VARCHAR(255),
    description TEXT,
    brand VARCHAR(100),
    price INT NOT NULL,
    discount_price INT NULL,
    stock INT NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE', 'DELETED') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- 6. Product Option Group Table
CREATE TABLE product_option_group (
    option_group_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    name VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- 7. Product Option Table
CREATE TABLE product_option (
    option_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    option_group_id BIGINT,
    value VARCHAR(100),
    FOREIGN KEY (option_group_id) REFERENCES product_option_group(option_group_id)
);

-- 8. Product Option Stock Table
CREATE TABLE product_option_stock (
    option_stock_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    option1_id BIGINT,
    option2_id BIGINT NULL,
    option3_id BIGINT NULL,
    stock INT,
    price INT,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (option1_id) REFERENCES product_option(option_id),
    FOREIGN KEY (option2_id) REFERENCES product_option(option_id),
    FOREIGN KEY (option3_id) REFERENCES product_option(option_id)
);

-- 9. Product Image Table
CREATE TABLE product_image (
    image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    image_url VARCHAR(255),
    sort_order INT,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- 10. Review Table
CREATE TABLE review (
    review_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    member_id BIGINT,
    order_item_id BIGINT,
    rating TINYINT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

-- 11. Review Image Table
CREATE TABLE review_image (
    review_image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    review_id BIGINT,
    image_url VARCHAR(255),
    FOREIGN KEY (review_id) REFERENCES review(review_id)
);

-- 12. Product QnA Table
CREATE TABLE product_qna (
    qna_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    member_id BIGINT,
    question TEXT,
    answer TEXT NULL,
    is_private TINYINT(1),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    answered_at DATETIME NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

-- 13. Cart Table
CREATE TABLE cart (
    cart_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

-- 14. Cart Item Table
CREATE TABLE cart_item (
    cart_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT,
    product_id BIGINT,
    option_stock_id BIGINT NULL,
    quantity INT,
    price INT,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (option_stock_id) REFERENCES product_option_stock(option_stock_id)
);

-- 15. Order Table
CREATE TABLE order_info (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT,
    address_id BIGINT,
    order_status ENUM('PENDING', 'PAID', 'SHIPPING', 'DELIVERED', 'CANCELLED'),
    payment_status ENUM('READY', 'SUCCESS', 'FAILED'),
    total_amount INT,
    delivery_fee INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    paid_at DATETIME NULL,
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (address_id) REFERENCES member_address(address_id)
);

-- 16. Order Item Table
CREATE TABLE order_item (
    order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    product_id BIGINT,
    option_stock_id BIGINT NULL,
    quantity INT,
    price INT,
    discount_price INT,
    FOREIGN KEY (order_id) REFERENCES order_info(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (option_stock_id) REFERENCES product_option_stock(option_stock_id)
);

-- 17. Order Delivery Table
CREATE TABLE order_delivery (
    delivery_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    delivery_status ENUM('READY', 'SHIPPING', 'DELIVERED'),
    tracking_number VARCHAR(50),
    courier VARCHAR(50),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES order_info(order_id)
);

-- 18. Payment Table
CREATE TABLE payment (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    pg_provider VARCHAR(50),
    method ENUM('CARD', 'KAKAO', 'NAVER', 'VBANK', 'PHONE'),
    amount INT,
    status ENUM('READY', 'SUCCESS', 'FAILED'),
    pg_tid VARCHAR(100),
    requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    approved_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES order_info(order_id)
);

-- 19. Coupon Table
CREATE TABLE coupon (
    coupon_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    discount_amount INT,
    min_purchase INT,
    expires_at DATETIME
);

-- 20. Member Coupon Table
CREATE TABLE member_coupon (
    member_coupon_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT,
    coupon_id BIGINT,
    is_used TINYINT,
    used_at DATETIME NULL,
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (coupon_id) REFERENCES coupon(coupon_id)
);

-- 21. Point History Table
CREATE TABLE point_history (
    point_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT,
    amount INT,
    type ENUM('EARN', 'USE'),
    description VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

-- 22. Banner Table
CREATE TABLE banner (
    banner_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    image_url VARCHAR(255),
    link_url VARCHAR(255),
    sort_order INT,
    is_active TINYINT,
    started_at DATETIME,
    ended_at DATETIME
);

-- 23. Admin User Table
CREATE TABLE admin_user (
    admin_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    role ENUM('ADMIN', 'MANAGER'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 25. Lightning Deal Table
CREATE TABLE lightning_deal (
    deal_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- 24. Recommended Keyword Table
CREATE TABLE recommended_keyword (
    keyword_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    keyword VARCHAR(100) NOT NULL,
    display_order INT,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);