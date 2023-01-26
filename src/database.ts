import { TUser, TProduct, TPurchase, Category } from "./types";

export const users: TUser[] = [
  {
    id: "u001",
    email: "email@gmail.com",
    password: "1234",
  },
  {
    id: "u002",
    email: "email@yahoo.com",
    password: "5678",
  },
];

export const products: TProduct[] = [
  {
    id: "prod001",
    name: "Caneta Gel - Tilibra - Flow 0.5mm",
    price: 10.49,
    description: "Marca: Tilibra",
    image_url:
      "https://images.tcdn.com.br/img/img_prod/847325/caneta_gel_tilibra_flow_0_5mm_72624383_1_04c9f8c8c4034d276fc9adde91219027.jpg",
    category: Category.CANETAS_EM_GEL,
  },
  {
    id: "prod002",
    name: "Stabilo Boss Pastel - Stabilo - Estojo c/ 4 Cores",
    price: 57.99,
    description: "Marca: Stabilo",
    image_url:
      "https://images.tcdn.com.br/img/img_prod/847325/stabilo_boss_pastel_stabilo_estojo_c_4_cores_72624317_1_703ea3290d7c189c1d01a6e112f82691.jpg",
    category: Category.MARCA_TEXTOS,
  },
];

export const purchases: TPurchase[] = [
  {
    id: "pur001",
    quantity: 2,
    totalPrice: 100.99,
    paid: 1,
    userId: "u001",
    productId: "prod002",
  },
  {
    id: "pur002",
    quantity: 1,
    totalPrice: 125.99,
    paid: 0,
    userId: "u002",
    productId: "prod003",
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
  description: string,
  image_url: string,
  category: Category
) {
  const newProduct: TProduct = {
    id,
    name,
    price,
    description,
    image_url,
    category,
  };
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
  id: string,
  quantity: number,
  totalPrice: number,
  paid: number,
  userId: string,
  productId: string
) {
  const newPurchase: TPurchase = {
    id,
    totalPrice,
    paid,
    userId,
    productId,
    quantity,
  };
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
