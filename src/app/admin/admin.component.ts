import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { LoginStatus } from '../models/loginStatus';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    const defLoginStatus: LoginStatus = { isLoggedIn: false, id: '', role: '' };
    const loginStatus: LoginStatus = JSON.parse(
      localStorage.getItem('loginStatus') ?? JSON.stringify(defLoginStatus)
    );
    this.getOrders(loginStatus.id);
  }

  getOrders(email: string) {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // approveOrder() {}
  // rejectOrder() {}
}
