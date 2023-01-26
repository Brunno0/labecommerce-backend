# Projeto Labecommerce

É o primeiro projeto do back-end, onde praticamos toda a base de criação de uma API vinculada a um banco de dados real.<br>

## Conteúdos abordados
<div style="display: inline_block">
  <img align="right" alt="unicorn-pic" height="200" src="https://media1.giphy.com/media/FoVzfcqCDSb7zCynOp/giphy.gif?cid=ecf05e472qtp73knmanmx98dcmcehiey8n36th3y1v9habhp&rid=giphy.gif">
</div>

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman

## Endpoints

    - Get all users
    - Create user
    - Create product
    - Get all products 
    - Get all products with query params
    - Edit product by id
    - Create purchase
    - Delete purchase by id
    - Get purchase by id

## Get all users
Retorna todas as pessoas cadastradas.<br>
```typescript
// Request
// GET /users

// Response
// status 200 OK
[
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: "2023-01-15 09:12:42"
    },
    {
        id: "u002",
        name: "Ciclana",
        email: "ciclana@email.com",
        password: "ciclana99",
        createdAt: "2023-01-17 12:35:28"
    }
]
```

## Create user
Cadastra uma nova pessoa.
```typescript
// Request
// POST /users
// body JSON
{
    "id": "u003",
    "name": "Astrodev",
    "email": "astrodev@email.com",
    "password": "astrodev00"
}

// Response
// status 201 CREATED
{
    message: "Cadastro realizado com sucesso"
}
```

## Create product
Cadastra um novo produto.
```typescript
// Request
// POST /products
// body JSON
{
    id: "prod003",
    name: "Teclado gamer",
    price: 200,
    description: "Teclado mecânico com numpad",
    imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400"
}

// Response
// status 201 CREATED
{
    message: "Produto cadastrado com sucesso"
}
```

## Get all products 
Retorna todos os produtos cadastrados.
```typescript
// Request
// GET /products

// Response
// status 200 OK
[
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    },
    {
        id: "prod003",
        name: "Teclado gamer",
        price: 200,
        description: "Teclado mecânico com numpad",
        imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400"
    }
]
```

## Get all products with query params
Caso seja enviada uma query params (q) deve ser retornado o resultado da busca de produtos por nome.
```typescript
// Request
// query params = q
// GET /products?q=gamer

// Response
// status 200 OK
[
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod003",
        name: "Teclado gamer",
        price: 200,
        description: "Teclado mecânico com numpad",
        imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400"
    }
]
```

## Edit product by id
Edita um produto existente.
```typescript
// Request
// path params = :id

// PUT /products/prod003
// body JSON
{
    id: "prod0033",
    name: "Teclado gamer RGB",
    price: 300,
    description: "Teclado mecânico com RGB e numpad",
    imageUrl: "https://picsum.photos/seed/Teclado%20gamer%20RGB/400"
}

// Response
// status 200 OK
{
    message: "Produto atualizado com sucesso"
}
```

## Create purchase
Cadastra um novo pedido.
```typescript
// Request
// POST /purchases
// body JSON
{
    id: "pur001",
    buyer: "u001",
    totalPrice: 1400,
    products: [
        {
            id: "prod001",
            name: "Mouse gamer",
            price: 250,
            description: "Melhor mouse do mercado!",
            imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
            quantity: 2
        },
        {
            id: "prod002",
            name: "Monitor",
            price: 900,
            description: "Monitor LED Full HD 24 polegadas",
            imageUrl: "https://picsum.photos/seed/Monitor/400",
            quantity: 1
        }
    ]
}

// Response
// status 201 CREATED
{
    message: "Pedido realizado com sucesso"
}
```

## Delete purchase by id
Deleta um pedido existente.
```typescript
// Request
// path params = :id
// DELETE /purchases/pur002

// Response
// status 200 OK
{
    message: "Pedido cancelado com sucesso"
}
```

## Get purchase by id
Retorna os dados de uma compra, incluindo a lista de produtos da mesma.
```typescript
// Request
// path params = :id
// GET /purchases/pur001

// Response
// status 200 OK
{
    purchaseId: "pur001",
    buyerId: "u001",
    buyerName: "Fulano",
    buyerEmail: "fulano@email.com",
    totalPrice: 1400,
    createdAt: "2023-01-15 16:24:54",
    paid: 0,
    products: [
        {
            id: "prod001",
            name: "Mouse gamer",
            price: 250,
            description: "Melhor mouse do mercado!",
            imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
            quantity: 2
        },
        {
            id: "prod002",
            name: "Monitor",
            price: 900,
            description: "Monitor LED Full HD 24 polegadas",
            imageUrl: "https://picsum.photos/seed/Monitor/400",
            quantity: 1
        }
    ]
}
```

## Banco de dados
![image](https://user-images.githubusercontent.com/29845719/214396608-ddcfd097-e615-44f9-acbe-f815f9abb83f.png)
https://dbdiagram.io/d/63c6e8e5296d97641d7a4666
