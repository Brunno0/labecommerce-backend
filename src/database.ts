import { TUser, TProduct, TPurchase } from "./types";

export const user: TUser[] = [
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

export const product: TProduct[] = [
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

export const purchase: TPurchase[] = [
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

// export type TUser = {
//   id: string;
//   email: string;
//   password: string;
// };

// export type TProduct = {
//   id: string;
//   name: string;
//   price: number;
//   category: string;
// };

// export type TPurchase = {
//   userId: string;
//   productId: string;
//   quantity: number;
//   totalPrice: number;
// };
