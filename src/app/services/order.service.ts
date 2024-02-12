import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderUrl: string = ' http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrder(id: string) {
    return this.http.get<Order>(`${this.orderUrl}/${id}`);
  }
  getAllOrders(){
return this.http.get<Array<Order>>(this.orderUrl);
  }

  getOrders(email:string){
    return this.http.get<Array<Order>>(`${this.orderUrl}?email=${email}`);
  }
  
  createOrder(order:Order){
    return this.http.post<Order>(`${this.orderUrl}`, order);
  }
}
