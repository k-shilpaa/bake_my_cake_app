import { Component, OnInit } from '@angular/core';
import { ShippingDetails } from '../models/shipping';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { LoginStatus } from '../models/loginStatus';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css'],
})
export class ShippingDetailsComponent implements OnInit {
  hasUnsavedChanges:boolean=false;
  shippingForm: FormGroup;
  loginStatus: LoginStatus = {
    isLoggedIn: false,
    id: '',
    role: '',
  };

  shippingDetails: ShippingDetails = {
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phoneNumber: '',
  };
  date!:Date;
  cart!: Cart;
  order!: Order;
 
 
  ngOnInit(): void {
    this.loginStatus = JSON.parse(
      localStorage.getItem('loginStatus') ??
        JSON.stringify({ isLoggedIn: false, id: '', role: '' })
    );
    this.getCart(this.loginStatus.id);
  }
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private dateService:DateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.shippingForm = this.formBuilder.group({
      fullName: ['', [Validators.required],Validators.minLength(4),Validators.pattern(/^[a-zA-Z]+$/)],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required],Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$|^\\d{6}$')],
      phoneNumber: ['', [Validators.required],[Validators.pattern('^[7-9][0-9]{9}$')]],
    });
  }
  checkValidation(){
    if(!this.hasUnsavedChanges){
      
      return alert('your changes might not be saved,are you sure you want to navigate???')

    }
    return true;

  }
  getCart(email: string) {
    this.cartService.getCart(email).subscribe({
      next: (data) => {
        this.cart = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  addShipping(shippingForm: FormGroup) {
    this.order = {
      id: this.generateRandomString(7),
      date:this.dateService.getCurrentDate(),
      email: this.loginStatus.id,
      shippingDetails: shippingForm.value,
      cart: this.cart,
      
    };
    console.log(this.order);
    this.orderService.createOrder(this.order).subscribe({
      next: (data) => {
        this.router.navigate(['/order', data.id]);

        // clear the cart
        this.cart.items = [];
        this.cart.subtotal = 0;
        this.cartService.addToCart(this.cart).subscribe({
          next: (data) => {},
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  get fullName() {
    return this.shippingForm.get('fullName');
  }
  get pincode() {
    return this.shippingForm.get('pincode');
  }
  get phoneNumber() {
    return this.shippingForm.get('phoneNumber');
  }
  get state() {
    return this.shippingForm.get('state');
  }
  get city() {
    return this.shippingForm.get('city');
  }
  get address() {
    return this.shippingForm.get('address');
  }
}
