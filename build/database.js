"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "1",
        email: "email@email.com",
        password: "1234",
    },
    {
        id: "2",
        email: "teste@teste.com",
        password: "4321",
    },
];
exports.products = [
    {
        id: "1",
        name: "mouse",
        price: 340.9,
        category: types_1.Category.ELECTRONICS,
    },
    {
        id: "2",
        name: "camiseta",
        price: 30.2,
        category: types_1.Category.CLOTHES_AND_SHOES,
    },
];
exports.purchases = [
    {
        userId: "1",
        productId: "1",
        quantity: 3,
        totalPrice: 400,
    },
    {
        userId: "2",
        productId: "2",
        quantity: 1,
        totalPrice: 32,
    },
];
function createUser(id, email, password) {
    const newUser = { id, email, password };
    exports.users.push(newUser);
    console.log("Usuário cadastrado com sucesso");
}
exports.createUser = createUser;
function getAllUsers(users) {
    return users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    const newProduct = { id, name, price, category };
    exports.products.push(newProduct);
    console.log("Produto cadastrado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts(products) {
    return products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    return exports.products.filter((product) => {
        return product.id === idToSearch;
    });
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    return exports.products.filter((product) => {
        return product.name.toLowerCase() === q;
    });
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = { userId, productId, quantity, totalPrice };
    exports.purchases.push(newPurchase);
    console.log("Compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    return exports.purchases.filter((purchase) => {
        return purchase.userId === userIdToSearch;
    });
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map