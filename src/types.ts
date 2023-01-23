export type TUser = {
  id: string;
  email: string;
  password: string;
};

export type TProduct = {
  id: string;
  name: string;
  price: number;
  category: "Acessórios" | "Roupas e calçados" | "Eletrônicos";
};

export type TPurchase = {
  id: string;
  quantity: number;
  totalPrice: number;
  paid: number;
  userId: string;
  productId: string;
};
export enum Category {
  ACCESSORIES = "Acessórios",
  CLOTHES_AND_SHOES = "Roupas e calçados",
  ELECTRONICS = "Eletrônicos",
}
