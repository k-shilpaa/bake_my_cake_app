import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs';
import { LoginStatus } from '../models/loginStatus';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
currentDate: any;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    
    const loginStatus: LoginStatus = JSON.parse(
      localStorage.getItem('loginStatus') ?? JSON.stringify({ isLoggedIn: false, id: '', role: '' })
    );
    this.getOrders(loginStatus.id);
  }

  getOrders(email: string) {
    this.orderService.getOrders(email).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.log(err);
      }

    })
  }
}


