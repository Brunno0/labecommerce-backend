import {
  users,
  products,
  purchases,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
  createPurchase,
  getAllPurchasesFromUserId,
} from "./database";
import { Category } from "./types";

// console.table(users);
// console.table(products);
// console.table(purchases);

//Exercicio 2: chamando funções
//user
createUser("3", "teste@teste.com", "654321");
console.log("Função que lista todos os usuários:");
console.table(getAllUsers(users));

//product
createProduct("3", "colar", 250.0, Category.ACCESSORIES);
console.log("Função que lista todos os produtos:");
console.table(getAllProducts(products));
console.log("Função para pegar um produto pelo Id:");
console.table(getProductById("3"));

//Exercicio 3: chamando mais funções
//product
console.log("Função para pegar um produto pelo nome:");
console.table(queryProductsByName("mouse"));

//purchase
createPurchase("3", "3", 6, 320.0);
console.log("Função para pegar uma compra pelo UserId:");
console.table(getAllPurchasesFromUserId("2"));
