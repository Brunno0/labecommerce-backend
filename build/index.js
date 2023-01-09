"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
<<<<<<< HEAD
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
    res.status(200).send(database_1.users);
});
app.get("/products", (req, res) => {
    res.status(200).send(database_1.products);
});
app.get("/product/search", (req, res) => {
    const q = req.query.q;
    const result = database_1.products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()));
    res.status(200).send(result);
});
app.post("/users", (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = {
        id,
        email,
        password,
    };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post("/products", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const newProduct = {
        id,
        name,
        price,
        category,
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.post("/purchases", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    };
    database_1.purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
});
=======
const types_1 = require("./types");
(0, database_1.createUser)("3", "teste@teste.com", "654321");
console.log("Função que lista todos os usuários:");
console.table((0, database_1.getAllUsers)(database_1.users));
(0, database_1.createProduct)("3", "colar", 250.0, types_1.Category.ACCESSORIES);
console.log("Função que lista todos os produtos:");
console.table((0, database_1.getAllProducts)(database_1.products));
console.log("Função que pega o produto pelo Id:");
console.table((0, database_1.getProductById)("3"));
console.log("Função para pegar um produto pelo nome:");
console.table((0, database_1.queryProductsByName)("mouse"));
(0, database_1.createPurchase)("3", "3", 6, 320.0);
console.log("Função para pegar uma compra pelo UserId:");
console.table((0, database_1.getAllPurchasesFromUserId)("2"));
>>>>>>> main
//# sourceMappingURL=index.js.map