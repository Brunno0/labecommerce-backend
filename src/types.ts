export type TUser = {
  id: string;
  email: string;
  password: string;
};

export type TProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category:
    | "Marca Textos"
    | "Cadernos argolados / Fichários"
    | "Cadernos"
    | "Canetas em Gel";
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
  MARCA_TEXTOS = "Marca Textos",
  CADERNOS_ARGOLADOS_FICHARIOS = "Cadernos argolados / Fichários",
  CADERNOS = "Cadernos",
  CANETAS_EM_GEL = "Canetas em Gel",
}
