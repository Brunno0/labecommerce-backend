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

CREATE TABLE purchases(
id TEXT PRIMARY KEY UNIQUE NOT NULL,
total_price REAL UNIQUE NOT NULL,
paid INT NOT NULL,
delivered_at TEXT NULL,
buyer_id TEXT NOT NULL,
FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
("p001", 120.99, 1, '2023-01-10', "1"),
("p002", 1200.50, 0, '2023-01-10', "1"),
("p003", 450.20, 1, '2023-01-11', "2"),
("p004", 150.99, 1, '2023-01-13', "2"),
("p005", 45.99, 0, '2023-01-12' , "3");

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
("p006", 229.99, 1, DATETIME(), "1"),
("p007", 539.99, 0, DATETIME(), "3"),
("p008", 129.99, 0, DATETIME(), "2"),
("p009", 329.99, 0, DATETIME(), "1");

UPDATE purchases
SET delivered_at = DATETIME()
WHERE id = "p002";

SELECT * FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id
-- ORDER BY users.id ASC
WHERE users.id = "1"