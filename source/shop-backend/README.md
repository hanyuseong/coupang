# Shop Backend API

This project is a backend API server for an e-commerce shopping mall built using Java 17, Spring Boot 3.x, JPA (Hibernate), and JWT-based authentication. It provides various functionalities to manage members, products, orders, payments, and more.

## Project Structure

```
shop-backend
├── mvnw
├── mvnw.cmd
├── .mvn
│   └── wrapper
│       ├── maven-wrapper.jar
│       └── maven-wrapper.properties
├── pom.xml
├── .gitignore
├── README.md
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── shop
│   │   │               ├── ShopApplication.java
│   │   │               ├── config
│   │   │               │   ├── SecurityConfig.java
│   │   │               │   ├── JwtTokenProvider.java
│   │   │               │   ├── JwtAuthenticationFilter.java
│   │   │               │   ├── CorsConfig.java
│   │   │               │   └── SwaggerConfig.java
│   │   │               ├── global
│   │   │               │   ├── common
│   │   │               │   │   ├── ApiResponse.java
│   │   │               │   │   ├── PageResponse.java
│   │   │               │   │   └── BaseEntity.java
│   │   │               │   ├── exception
│   │   │               │   │   ├── GlobalExceptionHandler.java
│   │   │               │   │   ├── BusinessException.java
│   │   │               │   │   └── ErrorCode.java
│   │   │               │   └── util
│   │   │               │       └── PasswordEncoderConfig.java
│   │   │               ├── domain
│   │   │               │   ├── member
│   │   │               │   │   ├── controller
│   │   │               │   │   │   ├── MemberController.java
│   │   │               │   │   │   └── AuthController.java
│   │   │               │   │   ├── service
│   │   │               │   │   │   ├── MemberService.java
│   │   │               │   │   │   ├── AuthService.java
│   │   │               │   │   │   └── impl
│   │   │               │   │   │       ├── MemberServiceImpl.java
│   │   │               │   │   │       └── AuthServiceImpl.java
│   │   │               │   │   ├── repository
│   │   │               │   │   │   ├── MemberRepository.java
│   │   │               │   │   │   └── MemberAddressRepository.java
│   │   │               │   │   ├── entity
│   │   │               │   │   │   ├── Member.java
│   │   │               │   │   │   └── MemberAddress.java
│   │   │               │   │   └── dto
│   │   │               │   │       ├── MemberDto.java
│   │   │               │   │       ├── SignUpRequest.java
│   │   │               │   │       ├── LoginRequest.java
│   │   │               │   │       ├── AuthResponse.java
│   │   │               │   │       └── AddressDto.java
│   │   │               │   ├── product
│   │   │               │   │   ├── controller
│   │   │               │   │   │   └── ProductController.java
│   │   │               │   │   ├── service
│   │   │               │   │   │   ├── ProductService.java
│   │   │               │   │   │   └── impl
│   │   │               │   │   │       └── ProductServiceImpl.java
│   │   │               │   │   ├── repository
│   │   │               │   │   │   └── ProductRepository.java
│   │   │               │   │   ├── entity
│   │   │               │   │   │   ├── Product.java
│   │   │               │   │   │   ├── ProductOptionGroup.java
│   │   │               │   │   │   ├── ProductOption.java
│   │   │               │   │   │   ├── ProductOptionStock.java
│   │   │               │   │   │   └── ProductImage.java
│   │   │               │   │   └── dto
│   │   │               │   │       └── ProductDto.java
│   │   │               │   ├── category
│   │   │               │   │   ├── controller
│   │   │               │   │   │   └── CategoryController.java
│   │   │               │   │   ├── service
│   │   │               │   │   │   ├── CategoryService.java
│   │   │               │   │   │   └── impl
│   │   │               │   │   │       └── CategoryServiceImpl.java
│   │   │               │   │   ├── repository
│   │   │               │   │   │   └── CategoryRepository.java
│   │   │               │   │   ├── entity
│   │   │               │   │   │   └── Category.java
│   │   │               │   │   └── dto
│   │   │               │   │       └── CategoryDto.java
│   │   │               │   ├── cart
│   │   │               │   │   ├── controller
│   │   │               │   │   │   └── CartController.java
│   │   │               │   │   ├── service
│   │   │               │   │   │   ├── CartService.java
│   │   │               │   │   │   └── impl
│   │   │               │   │   │       └── CartServiceImpl.java
│   │   │               │   │   ├── repository
│   │   │               │   │   │   └── CartRepository.java
│   │   │               │   │   ├── entity
│   │   │               │   │   │   ├── Cart.java
│   │   │               │   │   │   └── CartItem.java
│   │   │               │   │   └── dto
│   │   │               │   │       └── CartDto.java
│   │   │               │   ├── order
│   │   │               │   │   ├── controller
│   │   │               │   │   │   └── OrderController.java
│   │   │               │   │   ├── service
│   │   │               │   │   │   ├── OrderService.java
│   │   │               │   │   │   └── impl
│   │   │               │   │   │       └── OrderServiceImpl.java
│   │   │               │   │   ├── repository
│   │   │               │   │   │   └── OrderRepository.java
│   │   │               │   │   ├── entity
│   │   │               │   │   │   ├── Order.java
│   │   │               │   │   │   ├── OrderItem.java
│   │   │               │   │   │   └── OrderDelivery.java
│   │   │               │   │   └── dto
│   │   │               │   │       └── OrderDto.java
│   │   │               │   ├── payment
│   │   │               │   │   ├── controller
│   │   │               │   │   │   └── PaymentController.java
│   │   │               │   │   ├── service
│   │   │               │   │   │   ├── PaymentService.java
│   │   │               │   │   │   └── impl
│   │   │               │   │   │       └── PaymentServiceImpl.java
│   │   │               │   │   ├── repository
│   │   │               │   │   │   └── PaymentRepository.java
│   │   │               │   │   ├── entity
│   │   │               │   │   │   └── Payment.java
│   │   │               │   │   └── dto
│   │   │               │   │       └── PaymentDto.java
│   │   │               │   ├── review
│   │   │               │   │   ├── controller
│   │   │               │   │   │   └── ReviewController.java
│   │   │               │   │   ├── service
│   │   │               │   │   │   ├── ReviewService.java
│   │   │               │   │   │   └── impl
│   │   │               │   │   │       └── ReviewServiceImpl.java
│   │   │               │   │   ├── repository
│   │   │               │   │   │   └── ReviewRepository.java
│   │   │               │   │   ├── entity
│   │   │               │   │   │   ├── Review.java
│   │   │               │   │   │   └── ReviewImage.java
│   │   │               │   │   └── dto
│   │   │               │   │       └── ReviewDto.java
│   │   │               │   └── admin
│   │   │               │       ├── controller
│   │   │               │       │   └── AdminProductController.java
│   │   │               │       ├── service
│   │   │               │       │   └── AdminService.java
│   │   │               │       └── dto
│   │   │               │           └── AdminDto.java
│   │   │               └── infrastructure
│   │   │                   ├── pg
│   │   │                   │   └── PgClient.java
│   │   │                   └── email
│   │   │                       └── EmailService.java
│   │   └── resources
│   │       ├── application.yml
│   │       ├── schema.sql
│   │       └── data.sql
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── shop
│                       └── ShopApplicationTests.java
└── docker
    └── docker-compose.yml
```

## Features

- **User Authentication**: JWT-based authentication for secure access.
- **Member Management**: APIs for member registration, login, and profile management.
- **Product Management**: CRUD operations for products, including categories and options.
- **Cart Management**: APIs for managing user carts.
- **Order Processing**: APIs for creating and managing orders.
- **Payment Integration**: Integration with payment gateways for processing payments.
- **Review System**: APIs for submitting and managing product reviews.
- **Admin Panel**: APIs for managing products, orders, and users.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd shop-backend
   ```

3. Build the project using Maven:
   ```
   ./mvnw clean install
   ```

4. Run the application:
   ```
   ./mvnw spring-boot:run
   ```

5. Access the API documentation at:
   ```
   http://localhost:8080/swagger-ui.html
   ```

## Database Setup

The project uses MySQL as the database. Update the `application.yml` file with your database credentials.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.