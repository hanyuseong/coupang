-- Create tables for the shop database

-- Member table
CREATE TABLE IF NOT EXISTS member (
    member_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(50),
    created_at DATETIME,
    updated_at DATETIME
);

-- Category table
CREATE TABLE IF NOT EXISTS category (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    depth INT,
    parent_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Product table
CREATE TABLE IF NOT EXISTS product (
    product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    brand VARCHAR(255),
    price INT NOT NULL,
    discount_price INT,
    stock INT NOT NULL,
    status VARCHAR(50),
    category_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- Product Image table
CREATE TABLE IF NOT EXISTS product_image (
    product_image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(500),
    sort_order INT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

-- Product Option Group table
CREATE TABLE IF NOT EXISTS product_option_group (
    option_group_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    name VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

-- Product Option Stock table  
CREATE TABLE IF NOT EXISTS product_option_stock (
    option_stock_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    option_group_id BIGINT,
    option_value VARCHAR(255),
    price INT,
    stock INT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    FOREIGN KEY (option_group_id) REFERENCES product_option_group(option_group_id) ON DELETE CASCADE
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
    cart_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);

-- Cart Item table
CREATE TABLE IF NOT EXISTS cart_item (
    cart_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    option_stock_id BIGINT,
    quantity INT NOT NULL,
    price INT NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (option_stock_id) REFERENCES product_option_stock(option_stock_id)
);

-- Order table (renamed to avoid SQL keyword)
CREATE TABLE IF NOT EXISTS order_info (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT,
    total_amount INT NOT NULL,
    delivery_fee INT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

-- Order Item table
CREATE TABLE IF NOT EXISTS order_item (
    order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(255),
    quantity INT NOT NULL,
    price INT NOT NULL,
    discount_price INT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES order_info(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- Lightning Deal table
CREATE TABLE IF NOT EXISTS lightning_deal (
    deal_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    is_active BOOLEAN,
    created_at DATETIME,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

-- Review table
CREATE TABLE IF NOT EXISTS review (
    review_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    rating INT NOT NULL,
    content TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);
