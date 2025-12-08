SET NAMES utf8mb4;

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

INSERT INTO product (product_id, category_id, name, description, brand, price, discount_price, stock, status, created_at, updated_at)
VALUES
(1, 1, '남성 코튼 반팔', '데일리 반팔티', 'STANDARD', 19000, 15000, 0, 'ACTIVE', NOW(), NOW()),
(2, 1, '남성 조거팬츠', '편한 조거핏 팬츠', 'MOVEFIT', 29000, 25000, 0, 'ACTIVE', NOW(), NOW()),
(3, 1, '여성 플레어 원피스', '여름 플레어 원피스', 'LOVELY', 39000, NULL, 0, 'ACTIVE', NOW(), NOW()),
(4, 1, '여성 숏패딩', '경량 숏패딩', 'WINTERLY', 79000, 69000, 0, 'ACTIVE', NOW(), NOW()),
(5, 2, '스마트폰 케이스', '충격흡수 케이스', 'CASELAB', 12000, NULL, 0, 'ACTIVE', NOW(), NOW()),
(6, 1, '후라이팬 28cm', '넌스틱 코팅 프라이팬', 'COOKER', 25000, 18000, 0, 'ACTIVE', NOW(), NOW()),
(7, 1, '세면타월 3P', '부드러운 면타올 세트', 'HOMEWARM', 15000, NULL, 0, 'ACTIVE', NOW(), NOW()),
(8, 1, '수분크림', '저자극 보습 크림', 'SKINLAB', 22000, 18000, 0, 'ACTIVE', NOW(), NOW()),
(9, 1, '립스틱 매트', '고발색 매트 립스틱', 'BEAUTYPRO', 17000, 14000, 0, 'ACTIVE', NOW(), NOW()),
(10, 1, '러닝 반팔', '흡습속건 기능성 티셔츠', 'SPORTY', 24000, NULL, 0, 'ACTIVE', NOW(), NOW()),
(11, 1, '트레이닝 팬츠', '기능성 팬츠', 'SPORTY', 34000, NULL, 0, 'ACTIVE', NOW(), NOW()),
(12, 1, '캠핑용 의자', '접이식 캠핑 의자', 'OUTDOOR', 39000, 35000, 0, 'ACTIVE', NOW(), NOW()),
(13, 1, '캠핑용 랜턴', 'LED 충전 랜턴', 'OUTDOOR', 29000, 25000, 0, 'ACTIVE', NOW(), NOW()),
(14, 3, '블루투스 이어폰', '노이즈캔슬링 이어폰', 'SOUNDBOX', 89000, 79000, 0, 'ACTIVE', NOW(), NOW()),
(15, 3, '노트북 가방', '14인치 파우치', 'DIGIBAG', 23000, NULL, 0, 'ACTIVE', NOW(), NOW()),
(16, 3, '게이밍 마우스', 'RGB 게이밍 마우스', 'GAMERZ', 45000, 39000, 0, 'ACTIVE', NOW(), NOW()),
(17, 1, '여성 블라우스', '오피스룩 블라우스', 'LOVELY', 28000, NULL, 0, 'ACTIVE', NOW(), NOW()),
(18, 1, '남성 슬랙스', '슬림핏 슬랙스', 'STANDARD', 39000, 30000, 0, 'ACTIVE', NOW(), NOW()),
(19, 2, '스마트폰 보호필름', '강화유리 필름', 'PROGLASS', 9000, NULL, 0, 'ACTIVE', NOW(), NOW()),
(20, 1, '욕실 매트', '논슬립 욕실 매트', 'HOMEWARM', 17000, NULL, 0, 'ACTIVE', NOW(), NOW());

INSERT INTO product_image (product_id, image_url, sort_order) VALUES
(1, '/images/1.png', 1),
(2, '/images/2.png', 1),
(3, '/images/3.png', 1),
(4, '/images/4.png', 1),
(5, '/images/5.png', 1),
(6, '/images/6.png', 1),
(7, '/images/7.png', 1),
(8, '/images/8.png', 1),
(9, '/images/9.png', 1),
(10, '/images/10.png', 1),
(11, '/images/11.png', 1),
(12, '/images/12.png', 1),
(13, '/images/13.png', 1),
(14, '/images/14.png', 1),
(15, '/images/15.png', 1),
(16, '/images/16.png', 1),
(17, '/images/17.png', 1),
(18, '/images/18.png', 1),
(19, '/images/19.png', 1),
(20, '/images/20.png', 1);

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
('베스트 상품', 2, 1, NOW()),
('핫딜 할인', 3, 1, NOW()),
('MD 추천', 4, 1, NOW());

INSERT INTO lightning_deal (product_id, is_active, created_at) VALUES
(1, 1, NOW()),
(2, 1, NOW());

INSERT INTO review (product_id, member_id, rating, content, created_at) VALUES
(1, 1, 5, '로켓배송으로 바로 받아서 입어보니 소재가 시원하고 편해요.', NOW()),
(2, 2, 4, '주문하고 금방 받아서 운동할 때 잘 입고 있습니다.', NOW()),
(1, 2, 5, '땀 흡수가 잘 돼서 러닝할 때 쾌적합니다. 강력 추천!', NOW());