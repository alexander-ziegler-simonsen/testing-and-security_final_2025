-- Create database tradeIt if it does NOT already exist
DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'tradeIt'
    ) THEN
        CREATE DATABASE "tradeIt";
    END IF;
END
$$;

-- Switch to that database
\connect "tradeIt";

-- ENUMS
CREATE TYPE product_state AS ENUM ('Open', 'Sold', 'Deactivated');

-- USERS
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    signedUp TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PRODUCT CATEGORIES
CREATE TABLE "ProductCategories" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    fk_PC_parant_id INT REFERENCES "ProductCategories"(id) ON DELETE SET NULL
);

-- PRODUCTS
CREATE TABLE "Products" (
    id SERIAL PRIMARY KEY,
    fk_user_id INT REFERENCES "Users"(id) ON DELETE SET NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT,
    state product_state NOT NULL DEFAULT 'Open',
    fk_ProductCategories_id INT REFERENCES "ProductCategories"(id) ON DELETE SET NULL
);

-- PRODUCT IMAGES
CREATE TABLE "ProductImages" (
    id SERIAL PRIMARY KEY,
    fk_product_id INT NOT NULL REFERENCES "Products"(id) ON DELETE NO ACTION,
    imagePath TEXT NOT NULL
);

-- COMMENTS
CREATE TABLE "Comments" (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    fk_user_id INT REFERENCES "Users"(id) ON DELETE SET NULL,
    public BOOLEAN NOT NULL DEFAULT TRUE,
    fk_product_id INT NOT NULL REFERENCES "Products"(id) ON DELETE NO ACTION
);

-- PRODUCT FAVORITES
CREATE TABLE "ProductFavorite" (
    id SERIAL PRIMARY KEY,
    fk_user_id INT REFERENCES "Users"(id) ON DELETE SET NULL,
    fk_product_id INT REFERENCES "Products"(id) ON DELETE NO ACTION,

    -- Prevent duplicate favorites
    UNIQUE(fk_user_id, fk_product_id)
);


-- ================================
-- SEED DATA
-- ================================

-- USERS
INSERT INTO "Users" (username, password, salt, firstname, lastname, email, phone)
VALUES
('johnny123', 'hashed_pw_1', 'salt1', 'John', 'Andersen', 'john@example.com', '12345678'),
('sarah91', 'hashed_pw_2', 'salt2', 'Sarah', 'Nielsen', 'sarah@example.com', '87654321'),
('mike88', 'hashed_pw_3', 'salt3', 'Michael', 'Poulsen', 'mike@example.com', '99887766');


-- PRODUCT CATEGORIES
INSERT INTO "ProductCategories" (name, fk_PC_parant_id)
VALUES
('Electronics', NULL),
('Furniture', NULL),
('Phones', 1),       -- Child of Electronics
('Laptops', 1),      -- Child of Electronics
('Tables', 2);       -- Child of Furniture


-- PRODUCTS (updated with fk_ProductCategories_id)
INSERT INTO "Products" (fk_user_id, price, description, state, fk_ProductCategories_id)
VALUES
(1, 150.00, 'Used wooden coffee table in good condition.', 'Open', 5),  -- Tables
(2, 500.00, 'iPhone 12, 128GB, minor scratches.', 'Open', 3),          -- Phones
(3, 900.00, 'Dell XPS 13 laptop, excellent condition.', 'Open', 4);    -- Laptops


-- PRODUCT IMAGES
INSERT INTO "ProductImages" (fk_product_id, imagePath)
VALUES
(1, '/images/products/table1.jpg'),
(2, '/images/products/iphone12a.jpg'),
(2, '/images/products/iphone12b.jpg'),
(3, '/images/products/dellxps_front.jpg'),
(3, '/images/products/dellxps_side.jpg');


-- COMMENTS
INSERT INTO "Comments" (content, fk_user_id, public, fk_product_id)
VALUES
('Is this still available?', 2, TRUE, 1),
('Can you ship it to Copenhagen?', 1, TRUE, 2),
('Does the battery still hold well?', 1, TRUE, 3),
('Can you lower the price?', 3, TRUE, 2);


-- PRODUCT FAVORITES
INSERT INTO "ProductFavorite" (fk_user_id, fk_product_id)
VALUES
(1, 2),   -- John likes Sarah’s iPhone
(2, 3),   -- Sarah likes Mike’s laptop
(3, 1);   -- Mike likes John’s table