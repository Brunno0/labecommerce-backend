
// import {
//   users,
//   products,
//   purchases,
//   createUser,
//   getAllUsers,
//   createProduct,
//   getAllProducts,
//   getProductById,
//   queryProductsByName,
//   createPurchase,
//   getAllPurchasesFromUserId,
// } from "./database";
// import { Category } from "./types";

import express, { Request, Response } from "express";
import cors from "cors";
import { products, purchases, users } from "./database";
import { Category, TProduct, TPurchase, TUser } from "./types";


// console.table(users);
// console.table(products);
// console.table(purchases);

//Exercicio 2: chamando funções
//user

// createUser("3", "teste@teste.com", "654321");
// console.log("Função que lista todos os usuários:");
// console.table(getAllUsers(users));

//product
// createProduct("3", "colar", 250.0, Category.ACCESSORIES);
// console.log("Função que lista todos os produtos:");
// console.table(getAllProducts(products));
// console.log("Função para pegar um produto pelo Id:");
// console.table(getProductById("3"));

//Exercicio 3: chamando mais funções
//product
// console.log("Função para pegar um produto pelo nome:");
// console.table(queryProductsByName("mouse"));

//purchase
// createPurchase("3", "3", 6, 320.0);
// console.log("Função para pegar uma compra pelo UserId:");
// console.table(getAllPurchasesFromUserId("2"));

// createUser("3", "teste@teste.com", "654321");
// console.log("Função que lista todos os usuários:");
// console.table(getAllUsers(users));

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products);
});

// colocar ?q= para testar no postman
app.get("/product/search", (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result = products.filter((product) =>
    product.name.toLowerCase().includes(q.toLowerCase())
  );
  res.status(200).send(result);
});

app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  const newUser: TUser = {
    id,
    email,
    password,
  };

  users.push(newUser);

  res.status(201).send("Cadastro realizado com sucesso");
});

app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const category = req.body.category as Category;

  const newProduct: TProduct = {
    id,
    name,
    price,
    category,
  };

  products.push(newProduct);

  res.status(201).send("Produto cadastrado com sucesso");
});

app.post("/purchases", (req: Request, res: Response) => {
  const userId = req.body.userId as string;
  const productId = req.body.productId as string;
  const quantity = req.body.quantity as number;
  const totalPrice = req.body.totalPrice as number;

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  };

  purchases.push(newPurchase);

  res.status(201).send("Compra realizada com sucesso");
});



