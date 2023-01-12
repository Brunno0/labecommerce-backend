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
  try {
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// colocar ?q= para testar no postman
app.get("/product/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    if (q.length < 1) {
      res.status(400);
      throw new Error("query params deve possuir pelo menos um caractere");
    }
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(q.toLowerCase())
    );
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const findId = users.find((user) => user.id === id);
    if (findId) {
      res.status(400);
      throw new Error("ID Indisponivel");
    }

    const findEmail = users.find((user) => user.email === email);

    if (findEmail) {
      res.status(400);
      throw new Error("Email indisponivel");
    }

    const newUser: TUser = {
      id,
      email,
      password,
    };

    users.push(newUser);

    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    const findId = products.find((product) => product.id === id);
    const findName = products.find((product) => product.name === name);

    if (findId) {
      res.status(400);
      throw new Error("Id indisponivel");
    }

    if (findName) {
      res.status(400);
      throw new Error("Nome de produto indisponivel");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      category,
    };

    products.push(newProduct);

    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.post("/purchases", (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;

    const findUserId = purchases.find((purchase) => purchase.userId === userId);
    if (!findUserId) {
      res.status(400);
      throw new Error("Id de usuario nao encontrado");
    }

    const findProductId = products.find((product) => product.id === productId);
    if (!findProductId) {
      res.status(400);
      throw new Error("Id de produto nao encontrado");
    }

    if (findProductId.price * quantity !== totalPrice) {
      res.status(400);
      throw new Error("Total incorreto");
    }

    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };

    purchases.push(newPurchase);

    res.status(201).send("Compra realizada com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.get("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = products.find((product) => product.id === id);
    if (!result) {
      res.status(400);
      throw new Error("Produto nao encontrado");
    }
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = products.find((product) => product.id === id);
    if (!result) {
      res.status(400);
      throw new Error("Produto nao encontrado");
    }
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.delete("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findUser = users.find((user) => user.id === id);
    if (!findUser) {
      res.status(400);
      throw new Error("Usuario não encontrado");
    }

    const indexToRemove = users.findIndex((user) => user.id === id);

    if (indexToRemove >= 0) {
      users.splice(indexToRemove, 1);
    }

    res.status(200).send("User apagado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findProduct = products.find((product) => product.id === id);
    if (!findProduct) {
      res.status(400);
      throw new Error("Produto não encontrado");
    }

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex >= 0) {
      products.splice(productIndex, 1);
    }
    res.status(200).send("Produto apagado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.put("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.status(400);
      throw new Error("Usuario nao encontrado");
    }

    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    if (newEmail === req.body.email) {
      res.status(400);
      throw new Error("Email igual ao cadastrado no sistema");
    }

    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,12}$/g;

    if (newEmail !== undefined) {
      if (!newEmail.match(regexEmail)) {
        res.status(400);
        throw new Error("Email invalido");
      }
    }

    if (newPassword !== undefined) {
      if (typeof newPassword !== "string") {
        res.status(400);
        throw new Error("A senha precisa ser uma string");
      }
      if (!newPassword.match(regexPassword)) {
        res.status(400);
        throw new Error(
          "A senha deve possuir entre 4 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
        );
      }
    }

    if (user) {
      user.email = newEmail || user.email;
      user.password = newPassword || user.password;
    }

    res.status(200).send("Cadastro atualizado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.put("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = products.find((product) => product.id === id);

    if (!product) {
      res.status(400);
      throw new Error("Produto nao existe");
    }

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as Category | undefined;

    if (newName === req.body.name) {
      res.status(400);
      throw new Error("O nome ja esta cadastrado no sistema");
    }

    if (typeof newPrice !== "number") {
      res.status(400);
      throw new Error("O valor deve ser um numero");
    }

    if (product) {
      product.name = newName || product.name;
      product.price = newPrice || product.price;
      product.category = newCategory || product.category;
      product.price = isNaN(newPrice) ? product.price : newPrice;
    }
    res.status(200).send("Produto atualizado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});
