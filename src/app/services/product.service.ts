import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  productUrl: string = 'http://localhost:3000/products';
  categoryUrl: string = 'http://localhost:3000/categories';

  getAllProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.productUrl);
  }
  getProductbyId(id?: string): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }
  getAllCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.categoryUrl);
  }
}
