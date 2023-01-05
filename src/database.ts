import { TUser, TProduct, TPurchase, Category } from "./types";

export const users: TUser[] = [
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

export const products: TProduct[] = [
  {
    id: "1",
    name: "mouse",
    price: 340.9,
    category: Category.ELECTRONICS,
  },
  {
    id: "2",
    name: "camiseta",
    price: 30.2,
    category: Category.CLOTHES_AND_SHOES,
  },
];

export const purchases: TPurchase[] = [
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

//User
// createUser (cria uma nova pessoa na lista de users)
// input: três parâmetros (id, email e password)
// output: frase de sucesso ("Cadastro realizado com sucesso")
// exemplo de chamada: createUser("u003", "beltrano@email.com", "beltrano99")
export function createUser(id: string, email: string, password: string) {
  const newUser: TUser = { id, email, password };
  users.push(newUser);
  console.log("Usuário cadastrado com sucesso");
}

// getAllUsers (busca todas as pessoas da lista de users)
// input: nenhum
// output: lista atualizada de users
// exemplo de chamada: getAllUsers()
export function getAllUsers(users: TUser[]): TUser[] {
  return users;
}

//Exercicio 2: criando funções
// Product
// createProduct (cria um novo produto na lista de products)
// input: três parâmetros (id, name, price e category)
// output: frase de sucesso ("Produto criado com sucesso")
// exemplo de chamada: createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELECTRONICS)

export function createProduct(
  id: string,
  name: string,
  price: number,
  category: Category
) {
  const newProduct: TProduct = { id, name, price, category };
  products.push(newProduct);
  console.log("Produto cadastrado com sucesso");
}

//     getAllProducts (busca todos os produtos da lista de products)
// input: nenhum
// output: lista atualizada de products
// exemplo de chamada: getAllProducts()

export function getAllProducts(products: TProduct[]): TProduct[] {
  return products;
}

// getProductById (busca por produtos baseado em um id da lista de products)
// input: um parâmetro (idToSearch)
// output: o produto encontrado ou undefined
// exemplo de chamada: getProductById("p004")

export function getProductById(idToSearch: string): TProduct[] | undefined {
  return products.filter((product: TProduct) => {
    return product.id === idToSearch;
  });
}

//Exercicio 3: criando funções
// Product
// queryProductsByName (busca por produtos baseado em um nome da lista de products)
// input: um parâmetro (q) - q é a abreviação de query (termo de busca/consulta)
// output: lista de produtos com nomes que contenham o termo de busca
// extra: o resultado da busca deve ser case insensitive
// exemplo de chamada: queryProductsByName("monitor")
export function queryProductsByName(q: string): TProduct[] | undefined {
  return products.filter((product: TProduct) => {
    return product.name.toLowerCase() === q;
  });
}

// Purchase
// createPurchase (cria uma nova compra na lista de purchases)
// input: quatro parâmetros (userId, productId, quantity e totalPrice)
// output: frase de sucesso ("Compra realizada com sucesso")
// exemplo de chamada: createPurchase("u003", "p004", 2, 1600)
export function createPurchase(
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number
) {
  const newPurchase: TPurchase = { userId, productId, quantity, totalPrice };
  purchases.push(newPurchase);
  console.log("Compra realizada com sucesso");
}

// getAllPurchasesFromUserId (busca todas as compras feitas baseado no id do usuário)
// input: userIdToSearch
// output: lista atualizada de compras nas quais o userId delas são do userIdToSearch
// exemplo de chamada: getAllPurchasesFromUserId("u003")
export function getAllPurchasesFromUserId(
  userIdToSearch: string
): TPurchase[] | undefined {
  return purchases.filter((purchase) => {
    return purchase.userId === userIdToSearch;
  });
}
