import { Category } from './category.detail';

export interface Product {
  id: number;
  productName: string;
  price: number;
  imageURL: string;
  category:Category;
}
