import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { Item } from '../models/item';
import { Product } from '../models/product';
import { LoginStatus } from '../models/loginStatus';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  product: Product = {
    image: 'not-found',
    id: '',
    name: '',
    price: 0,
    category: '',
    rating: 0,
    description: '',
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const defLoginStatus: LoginStatus = { isLoggedIn: false, id: '', role: '' };
    const loginStatus: LoginStatus = JSON.parse(
      localStorage.getItem('loginStatus') ?? JSON.stringify(defLoginStatus)
    );

    this.getCart(loginStatus.id);
  }

  getCart(email: string) {
    this.cartService.getCart(email).subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (err) => {
        // this.createNewCart(email);
      },
    });
  }

  deleteItem(item: Item) {
    let indexToRemove = this.cart.items.findIndex(it => it.id === item.id && it.quantity === item.quantity);
    this.cart.items.splice(indexToRemove, 1);
    this.cart.subtotal = this.cart.subtotal - item.price;

    this.cartService.addToCart(this.cart).subscribe({
      next: (data) => {  window.location.reload(); },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
