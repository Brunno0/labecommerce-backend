"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.product = exports.user = void 0;
exports.user = [
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
exports.product = [
    {
        id: "1",
        name: "mouse",
        price: 10.9,
        category: "periféricos",
    },
    {
        id: "2",
        name: "celular",
        price: 300.2,
        category: "celular",
    },
];
exports.purchase = [
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
//# sourceMappingURL=database.js.map