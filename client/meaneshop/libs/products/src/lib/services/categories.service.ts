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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.URL, category);
  }
  deleteCategory(categoryId: string): Observable<object> {
    return this.http.delete<object>(this.URL + categoryId);
  }
}
