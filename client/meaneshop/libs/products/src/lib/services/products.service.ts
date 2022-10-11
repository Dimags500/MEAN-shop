import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../modesl/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  URL = 'http://localhost:3030/api/v1/products/';
  constructor(private http: HttpClient) {}

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(this.URL + productId);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.URL, product);
  }
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(this.URL + productId);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.URL + product.id, product);
  }
}
