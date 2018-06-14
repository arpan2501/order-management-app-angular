import { Category } from './category.detail';

export interface Product {
  id: number;
  productName: string;
  price: Number;
  category:Category;
  productImage;
}
