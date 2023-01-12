"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/users", (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/products", (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/product/search", (req, res) => {
    try {
        const q = req.query.q;
        if (q.length < 1) {
            res.status(400);
            throw new Error("query params deve possuir pelo menos um caractere");
        }
        const result = database_1.products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()));
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        const findId = database_1.users.find((user) => user.id === id);
        if (findId) {
            res.status(400);
            throw new Error("ID Indisponivel");
        }
        const findEmail = database_1.users.find((user) => user.email === email);
        if (findEmail) {
            res.status(400);
            throw new Error("Email indisponivel");
        }
        const newUser = {
            id,
            email,
            password,
        };
        database_1.users.push(newUser);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/products", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const findId = database_1.products.find((product) => product.id === id);
        const findName = database_1.products.find((product) => product.name === name);
        if (findId) {
            res.status(400);
            throw new Error("Id indisponivel");
        }
        if (findName) {
            res.status(400);
            throw new Error("Nome de produto indisponivel");
        }
        const newProduct = {
            id,
            name,
            price,
            category,
        };
        database_1.products.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/purchases", (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const totalPrice = req.body.totalPrice;
        const findUserId = database_1.purchases.find((purchase) => purchase.userId === userId);
        if (!findUserId) {
            res.status(400);
            throw new Error("Id de usuario nao encontrado");
        }
        const findProductId = database_1.products.find((product) => product.id === productId);
        if (!findProductId) {
            res.status(400);
            throw new Error("Id de produto nao encontrado");
        }
        if (findProductId.price * quantity !== totalPrice) {
            res.status(400);
            throw new Error("Total incorreto");
        }
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice,
        };
        database_1.purchases.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/product/:id", (req, res) => {
    try {
        const id = req.params.id;
        const result = database_1.products.find((product) => product.id === id);
        if (!result) {
            res.status(400);
            throw new Error("Produto nao encontrado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/users/:id/purchases", (req, res) => {
    try {
        const id = req.params.id;
        const result = database_1.products.find((product) => product.id === id);
        if (!result) {
            res.status(400);
            throw new Error("Produto nao encontrado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/user/:id", (req, res) => {
    try {
        const id = req.params.id;
        const findUser = database_1.users.find((user) => user.id === id);
        if (!findUser) {
            res.status(400);
            throw new Error("Usuario não encontrado");
        }
        const indexToRemove = database_1.users.findIndex((user) => user.id === id);
        if (indexToRemove >= 0) {
            database_1.users.splice(indexToRemove, 1);
        }
        res.status(200).send("User apagado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/product/:id", (req, res) => {
    try {
        const id = req.params.id;
        const findProduct = database_1.products.find((product) => product.id === id);
        if (!findProduct) {
            res.status(400);
            throw new Error("Produto não encontrado");
        }
        const productIndex = database_1.products.findIndex((product) => product.id === id);
        if (productIndex >= 0) {
            database_1.products.splice(productIndex, 1);
        }
        res.status(200).send("Produto apagado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/user/:id", (req, res) => {
    try {
        const id = req.params.id;
        const user = database_1.users.find((user) => user.id === id);
        if (!user) {
            res.status(400);
            throw new Error("Usuario nao encontrado");
        }
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        if (newEmail === req.body.email) {
            if (!user) {
                res.status(400);
                throw new Error("Email igual ao cadastrado no sistema");
            }
        }
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,12}$/g;
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
                throw new Error("A senha deve possuir entre 4 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
            }
        }
        if (user) {
            user.email = newEmail || user.email;
            user.password = newPassword || user.password;
        }
        res.status(200).send("Cadastro atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/product/:id", (req, res) => {
    try {
        const id = req.params.id;
        const product = database_1.products.find((product) => product.id === id);
        if (!product) {
            res.status(400);
            throw new Error("Produto nao existe");
        }
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newCategory = req.body.category;
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
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
//# sourceMappingURL=index.js.map