"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
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
//# sourceMappingURL=index.js.map