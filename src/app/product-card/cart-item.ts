import { Product } from "../product.info";

export interface Item {
  id: number;
  quantity: Number;
  product: Product;
  shoppingCartId: string;
}
