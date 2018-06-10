import { Category } from './category.detail';

export interface Product {
  id: number;
  productName: string;
  price: Number;
  imageURL: string;
  category:Category;
}
