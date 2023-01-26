import express, { Request, Response } from "express";
import cors from "cors";
import { products, users } from "./database";
import { Category, TProduct, TPurchase, TUser } from "./types";
import { db } from "./database/knex";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

/*------------------------- GET -------------------------------*/

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");
    res.status(200).send({ Users: result });
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products");
    res.status(200).send({ Products: result });
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// colocar ?q= para testar no postman
app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    if (q.length < 1) {
      res.status(400);
      throw new Error("query params deve possuir pelo menos um caractere");
    }
    const product = await db("products").where("name", "LIKE", `%${q}%`);
    res.status(200).send({ Product: product });
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/product/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [product] = await db("products").where({ id: id });

    if (!product) {
      res.status(400);
      throw new Error("Produto não encontrado");
    }

    res.status(200).send({ product: product });
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const purchase = await db("purchases").where({ buyer_id: id });

    if (!purchase) {
      res.status(400);
      throw new Error("Compra não encontrada");
    }

    res.status(200).send({ purchase: purchase });
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const [result] = await db("purchases").where({ id: id });

    if (!result) {
      res.status(404);
      throw new Error("Compra não encontrada");
    }

    const [user] = await db("users").where({ id: result.buyerId });
    result["name"] = user.name;
    result["email"] = user.email;

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

/*------------------------- POST -------------------------------*/

app.post("/users", async (req: Request, res: Response) => {
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

    await db("users").insert(newUser);

    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, image_url, category } = req.body;

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
      description,
      image_url,
      category,
    };

    await db("products").insert(newProduct);

    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, quantity, total_price, paid, buyer_id, product_id } = req.body;

    if (paid > 1 && paid < 0) {
      res.status(400);
      throw new Error("'paid' invalido, deve ser 0 ou 1");
    }

    if (
      id.length < 1 ||
      quantity.length < 1 ||
      total_price.length < 1 ||
      paid.length < 1 ||
      buyer_id.length < 1 ||
      product_id.length < 1
    ) {
      res.status(400);
      throw new Error("As informações devem ter no minimo 1 caractere");
    }

    const newPurchase: TPurchase = {
      id,
      totalPrice: total_price,
      paid,
      userId: buyer_id,
      productId: product_id,
      quantity,
    };

    await db("purchases").insert(newPurchase);

    res.status(201).send("Compra realizada com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

/*------------------------- DELETE -------------------------------*/

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

/*------------------------- PUT -------------------------------*/

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
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
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
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
