-- Create database if it does not exist
SELECT 'CREATE DATABASE "tradeIt"'
WHERE NOT EXISTS (
    SELECT FROM pg_database WHERE datname = 'tradeIt'
)\gexec

-- Switch to that database
\c "tradeIt";

-- ENUMS
CREATE TYPE product_state AS ENUM ('Open', 'Sold', 'Deactivated');
CREATE TYPE user_type as ENUM ('user', 'admin');

-- USERS
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    hashedPassword VARCHAR(64) NOT NULL,
    salt VARCHAR(36) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(8) NOT NULL,
    signedUp TIMESTAMP NOT NULL DEFAULT NOW(),
    user_role user_type NOT NULL DEFAULT 'user'
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
    title VARCHAR(255) NOT NULL,
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
INSERT INTO "Users" (username, hashedPassword, salt, firstname, lastname, email, phone, user_role)
VALUES
('johnny123', 'fe871c39f90c87ddb13b9a1dfe247cfdfae24e926dabf3c3f4a4a32323c8926f', '85b8fca5-3f27-4d02-b631-dad5bd7ce5c8', 'John', 'Andersen', 'john@example.com', '12345678', 'admin'),
('sarah91', '7d9f3598f0aea01e42513f316d94aa316ff1d3697d602f0e6db1c297c3a17123', '1826f888-bddd-4388-9490-b743b43fee5a', 'Sarah', 'Nielsen', 'sarah@example.com', '87654321', 'user'),
('mike88', 'a3f1c44d89c94c9072e7a203092bc59e6bdc36739f5ecc6f1508793300ff4fdf', '99c81109-132a-48d1-865e-1b3d879b1ac6', 'Michael', 'Poulsen', 'mike@example.com', '99887766', 'user');


-- PRODUCT CATEGORIES
INSERT INTO "ProductCategories" (name, fk_PC_parant_id)
VALUES
('Electronics', NULL),                          --1
('Furniture', NULL),                            --2
('Phones', 1),       -- Child of Electronics    --3
('Laptops', 1),      -- Child of Electronics    --4
('Tables', 2),       -- Child of Furniture      --5
('Chair', 2) ,        -- Child of Furniture      --6
('vehicles', NULL),                             --7
('clothes', NULL),                              --8
('cars', 7),                                 --9
('tractor', 7)  ,                             --10
('jacket', 8) ,                              --11
('consoles', 1) ,                           --12
('TV',1),                                --13
('PC',1)   ;                                 --14


-- PRODUCTS (updated with fk_ProductCategories_id)
INSERT INTO "Products" (fk_user_id, price, title, description, state, fk_ProductCategories_id)
VALUES
(1, 150.00, 'wood table', 'Used wooden coffee table in good condition.', 'Open', 5),  -- Tables
(2, 500.00, 'iphone 12', 'iPhone 12, 128GB, minor scratches.', 'Open', 3),          -- Phones
(3, 900.00, 'XPS 13 laptop', 'Dell XPS 13 laptop, excellent condition.', 'Open', 4), -- Laptops

(1, 900.00, '80 inch TV', 'this is a tv I want to sell, since I got a new one that is smaller', 'Open', 13), --tv

(1, 900000.00, 'used teslar', 'selling it, since I need money fast', 'Open', 9), --car

(1, 50000.00, 'used tractor', 'selling it, since I need money fast', 'Open', 10), --tractor

(1, 1000.00, 'used ps5', 'selling it, since I need money fast', 'Open', 12), --console

(1, 1000.00, 'used xbox', 'selling it, since I need money fast', 'Open', 12), --console

(1, 100.00, 'used char', 'selling it, since I no longer feel the need to sit down any more', 'Open', 6), --char

(1, 1234.00, 'used PC', 'selling it, since my girl do not want me to own a pc, give a bid', 'Open', 14), --pc

(1, 234.00, 'used jacket', 'selling it as used, I got a new better one', 'Open', 14); --pc



-- PRODUCT IMAGES
INSERT INTO "ProductImages" (fk_product_id, imagePath)
VALUES
(1, '/uploads/imgs/table1.jpg'),
(2, '/uploads/imgs/iphone.jpg'),
(2, '/uploads/imgs/iphone2.jpg'),

(3, '/uploads/imgs/dell.jpg'),
(3, '/uploads/imgs/dell2.jpg'),

(4, '/uploads/imgs/tv2.jpg'),

(5, '/uploads/imgs/bil.jpg'),

(6, '/uploads/imgs/traktor.jpg'),

(7, '/uploads/imgs/ps5.jpg'),

(8, '/uploads/imgs/xbox.jpg'),

(9, '/uploads/imgs/stol2.jpg'),

(10, '/uploads/imgs/pc.jpg'),

(11, '/uploads/imgs/jakke.jpg');


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