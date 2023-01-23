-- Active: 1673879224445@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
("u001", "email@gmail.com", "1234"),
("u002", "email@yahoo.com", "5678"),
("u003", "email@outlook.com", "9010");

CREATE TABLE products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL UNIQUE, 
  category TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url, category)
VALUES
("p001", "Caneta Gel - Tilibra - Flow 0.5mm", 10.49, "Marca: Tilibra", "https://images.tcdn.com.br/img/img_prod/847325/caneta_gel_tilibra_flow_0_5mm_72624383_1_04c9f8c8c4034d276fc9adde91219027.jpg", "Canetas em Gel"),
("p002", "Stabilo Boss Pastel - Stabilo - Estojo c/ 4 Cores", 57.99, "Marca: Stabilo", "https://images.tcdn.com.br/img/img_prod/847325/stabilo_boss_pastel_stabilo_estojo_c_4_cores_72624317_1_703ea3290d7c189c1d01a6e112f82691.jpg", "Marca Textos"),
("p003", "Caderno Médio - Caderno Inteligente - Ônyx 80 Folhas 90g/m²", 122.99, "Marca: Caderno Inteligente", "https://images.tcdn.com.br/img/img_prod/847325/caderno_medio_caderno_inteligente_onyx_80_folhas_90g_m_72624505_1_9f36e7eb4eddb39d86631b4a405403aa.jpg" , "Cadernos"),
("p004", "Caderno Argolado Colegial - Tilibra - Check Pop 160 Folhas", 105.99, "Marca: Tilibra", "https://images.tcdn.com.br/img/img_prod/847325/caderno_argolado_colegial_tilibra_check_pop_72624403_1_f3d52b7857ebb93ffb98e5eacea34b1a.jpg", "Cadernos argolados / Fichários"),
("p005", "Marca Texto - CIS - Mini Lumini Pastel", 3.50, "Marca: CIS", "https://images.tcdn.com.br/img/img_prod/847325/marca_texto_cis_mini_lumini_pastel_72617691_1_eee228e0426195525ea91d9aad9f10ae.jpeg", "Marca Textos");

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name LIKE "%caderno%";

SELECT * FROM products
WHERE id = "003";

DELETE FROM users
WHERE id = "3";

DELETE FROM products
WHERE id = "005";

UPDATE users
SET password = "newPassword"
WHERE id = "2";

-- UPDATE products
-- SET 
--   name = "Teclado Mecânico Gamer HyperX Alloy MKW100, RGB, Switch Red, Full Size, Layout US - 4P5E1AA#ABA",
--   price = 299.99
-- WHERE id = "002";

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
quantity INT NOT NULL,
total_price REAL UNIQUE NOT NULL,
paid INT NOT NULL,
created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
buyer_id TEXT NOT NULL,
product_id TEXT NOT NULL,
FOREIGN KEY (buyer_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases (id, quantity, total_price, paid, buyer_id, product_id)
VALUES
("b001", 3, 10.49, 1,  "u001", "p001"),
("b002", 1, 57.99, 0, "u003", "p002"),
("b003", 1, 122.99, 0, "u002", "p003"),
("b004", 1, 105.99, 0, "u001", "p004");

SELECT * FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id
-- ORDER BY users.id ASC
WHERE users.id = "u001";

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products(purchase_id, product_id, quantity) 
VALUES
    ("p001", "001", "2"),
    ("p001", "002", "1"),
    ("p002", "001", "1");

SELECT * FROM purchases_products;

SELECT 
purchases.id AS purchaseId,
products.name AS productName,
purchases.buyer_id AS buyerId
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

SELECT 
purchases.id AS purchaseId,
products.name AS productName,
purchases.buyer_id AS buyerId
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
RIGHT JOIN products
ON purchases_products.product_id = products.id;

      SELECT * FROM products
      WHERE LOWER(name) LIKE ("%mouse%");