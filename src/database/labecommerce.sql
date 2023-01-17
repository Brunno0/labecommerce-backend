-- Active: 1673879224445@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
("1", "email@gmail.com", "1234"),
("2", "email@yahoo.com", "5678"),
("3", "email@outlook.com", "9010");

CREATE TABLE products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL, 
  category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
("001", "mouse", 450.20, "Eletrônicos"),
("002", "teclado", 1200.50,"Eletrônicos"),
("003", "camiseta", 45.99, "Roupas e calçados"),
("004", "oculos", 150.99, "Acessórios"),
("005", "colar", 500.00, "Acessórios");

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name LIKE "%mouse%";

INSERT INTO users (id, email, password)
VALUES
("4", "email@hotmail.com", "1112");

INSERT INTO products (id, name, price, category)
VALUES
("007", "Short", 120.99, "Roupas e calçados");

SELECT * FROM products
WHERE id = "003";

DELETE FROM users
WHERE id = "3";

DELETE FROM products
WHERE id = "005";

UPDATE users
SET password = "newPassword"
WHERE id = "2";

UPDATE products
SET 
  name = "Teclado Mecânico Gamer HyperX Alloy MKW100, RGB, Switch Red, Full Size, Layout US - 4P5E1AA#ABA",
  price = 299.99
WHERE id = "002";

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 1,20;

SELECT * FROM products
WHERE price >= 100.00 AND price <= 300
ORDER BY price ASC;