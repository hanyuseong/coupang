INSERT INTO member (email, password, name, phone, status, created_at, updated_at) VALUES
('user1@example.com', '$2a$10$EIXZ5g5y5Z8Z5Z5Z5Z5Z5O', '홍길동', '01012345678', 'ACTIVE', NOW(), NOW()),
('user2@example.com', '$2a$10$EIXZ5g5y5Z8Z5Z5Z5Z5Z5O', '김철수', '01098765432', 'ACTIVE', NOW(), NOW());

INSERT INTO member_address (member_id, receiver_name, receiver_phone, zipcode, addr1, addr2, is_default, created_at) VALUES
(1, '홍길동', '01033334444', '06011', '서울시 강남구', '101동 501호', 1, NOW()),
(1, '홍길동', '01033334444', '06012', '서울시 강남구', '102동 502호', 0, NOW());

INSERT INTO category (category_id, parent_id, name, depth, sort_order) VALUES
(1, NULL, '패션', 1, 1),
(2, 1, '남성 패션', 2, 1),
(3, 1, '여성 패션', 2, 2);

INSERT INTO product (product_id, category_id, name, description, brand, price, discount_price, stock, status, created_at, updated_at) VALUES
(1, 2, '나이키 에어포스', '편안한 운동화', 'Nike', 129000, 99000, 100, 'ACTIVE', NOW(), NOW()),
(2, 3, '아디다스 울트라부스트', '최고의 러닝화', 'Adidas', 180000, NULL, 50, 'ACTIVE', NOW(), NOW());

INSERT INTO product_option_group (option_group_id, product_id, name) VALUES
(1, 1, '색상'),
(2, 1, '사이즈');

INSERT INTO product_option (option_id, option_group_id, value) VALUES
(1, 1, 'White'),
(2, 1, 'Black'),
(3, 2, 'M'),
(4, 2, 'L');

INSERT INTO product_option_stock (option_stock_id, product_id, option1_id, option2_id, stock, price) VALUES
(1, 1, 1, 3, 50, 99000),
(2, 1, 1, 4, 30, 99000),
(3, 1, 2, 3, 20, 99000),
(4, 1, 2, 4, 10, 99000);

INSERT INTO cart (cart_id, member_id, created_at) VALUES
(1, 1, NOW());

INSERT INTO cart_item (cart_item_id, cart_id, product_id, option_stock_id, quantity, price) VALUES
(1, 1, 1, 1, 2, 99000),
(2, 1, 2, 3, 1, 180000);

INSERT INTO order (order_id, member_id, address_id, order_status, payment_status, total_amount, delivery_fee, created_at) VALUES
(1, 1, 1, 'PAID', 'SUCCESS', 207000, 0, NOW());

INSERT INTO order_item (order_item_id, order_id, product_id, option_stock_id, quantity, price, discount_price) VALUES
(1, 1, 1, 1, 2, 99000, 99000),
(2, 1, 2, 3, 1, 180000, NULL);