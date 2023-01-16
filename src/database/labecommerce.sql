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

SELECT * FROM products