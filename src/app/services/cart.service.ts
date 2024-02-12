import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUrl: string = '  http://localhost:3000/carts';

  constructor(private http: HttpClient) {}
  addToCart(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.cartUrl}/${cart.id}`, cart);
  }

  createDefaultCart(email: string) {
    const emptyCart: Cart = { id: email, items: [], subtotal: 0 };
    return this.http.post<Cart>(`${this.cartUrl}`, emptyCart);
  }

  getCart(email: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.cartUrl}/${email}`);
  }
 
}
