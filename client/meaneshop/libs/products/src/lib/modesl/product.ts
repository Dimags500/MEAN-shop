import { Category } from './catrgory';

export class Product {
  id?: string;
  name?: string;
  description?: string;
  richDesription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  price?: number;
  category?: Category;
  countInStock?: number;
  raiting?: number;
  numReviews?: number;
  isFeatured?: boolean;
  dateCreates?: string;
}
