INSERT INTO member (email, password, name, phone, status, created_at, updated_at) VALUES
('user1@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '홍길동', '01012345678', 'ACTIVE', NOW(), NOW()),
('user2@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '김철수', '01098765432', 'ACTIVE', NOW(), NOW());

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

INSERT INTO order_info (order_id, member_id, address_id, order_status, payment_status, total_amount, delivery_fee, created_at) VALUES
(1, 1, 1, 'PAID', 'SUCCESS', 207000, 0, NOW());

INSERT INTO order_item (order_item_id, order_id, product_id, option_stock_id, quantity, price, discount_price) VALUES
(1, 1, 1, 1, 2, 99000, 99000),
(2, 1, 2, 3, 1, 180000, NULL);

INSERT INTO recommended_keyword (keyword, display_order, is_active, created_at) VALUES
('여름 신상', 1, 1, NOW()),
('베스트셀러', 2, 1, NOW()),
('특가 할인', 3, 1, NOW()),
('MD 추천', 4, 1, NOW());

INSERT INTO lightning_deal (product_id, is_active, created_at) VALUES
(1, 1, NOW()),
(2, 1, NOW());
INSERT INTO member (email, password, name, phone, status, created_at, updated_at) VALUES
('user1@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '홍길동', '01012345678', 'ACTIVE', NOW(), NOW()),
('user2@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '김철수', '01098765432', 'ACTIVE', NOW(), NOW());

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

INSERT INTO order_info (order_id, member_id, address_id, order_status, payment_status, total_amount, delivery_fee, created_at) VALUES
(1, 1, 1, 'PAID', 'SUCCESS', 207000, 0, NOW());

INSERT INTO order_item (order_item_id, order_id, product_id, option_stock_id, quantity, price, discount_price) VALUES
(1, 1, 1, 1, 2, 99000, 99000),
(2, 1, 2, 3, 1, 180000, NULL);

INSERT INTO recommended_keyword (keyword, display_order, is_active, created_at) VALUES
('여름 신상', 1, 1, NOW()),
('베스트셀러', 2, 1, NOW()),
('특가 할인', 3, 1, NOW()),
('MD 추천', 4, 1, NOW());

INSERT INTO lightning_deal (product_id, is_active, created_at) VALUES
(1, 1, NOW()),
(2, 1, NOW());

INSERT INTO review (product_id, member_id, rating, content, created_at) VALUES
(1, 1, 5, '로켓프레시로 새벽에 도착해서 바로 해먹었어요. 신선하고 맛있습니다!', NOW()),
(2, 2, 4, '주문 다음 날 바로 받았습니다. 쿠팡 배송 역시 빠르네요. 잘 쓰겠습니다.', NOW()),
(1, 2, 5, '청소 스케줄 관리가 편해서 집안일이 한결 수월해졌어요. 강력 추천합니다!', NOW());

INSERT INTO promotions
(id, created_at, updated_at, banner_image, description, end_date, is_active, start_date, title)
VALUES
(1, '2025-11-30 10:16:37.111829', NULL, 'http://localhost:3001/banners/banner_electronics_man.png', '<h1>전자제품 기획전</h1><p> 80% 할인</p>', '2025-01-31 23:59:59', 0, '2025-01-01 00:00:00', '전자제품 기획전'),
(2, '2025-11-30 10:16:40.294765', NULL, 'http://localhost:3001/banners/banner_fashion_man.png', '<h1>2025 F/W 패션 기획전</h1><p>최대 90%까지 할인 행사</p>', '2025-08-31 23:59:59', 0, '2025-06-01 00:00:00', '2025 F/W 패션 기획전'),
(3, '2025-11-30 10:16:44.729614', NULL, 'http://localhost:3001/banners/banner_fresh_man.png', '<h1>프레시 과일 기획전</h1><p>과일행사</p><table border="1"><tr><th>상품명</th><th>할인가</th></tr><tr><td>TV</td><td>50만원</td></tr></table>', '2025-11-30 23:59:59', 0, '2025-11-01 00:00:00', '한스 프레시 과일 기획전');