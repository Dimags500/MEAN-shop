import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../modesl/catrgory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  URL = 'http://localhost:3030/api/v1/categories/';
  constructor(private http: HttpClient) {}

  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(this.URL + categoryId);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.URL, category);
  }
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(this.URL + categoryId);
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.URL + category.id, category);
  }
}
