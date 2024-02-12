import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Item } from '../models/item';
import { User } from '../models/user';
import { Cart } from '../models/cart';
import { LoginStatus } from '../models/loginStatus';

@Component({
  selector: 'app-product-description-page',
  templateUrl: './product-description-page.component.html',
  styleUrls: ['./product-description-page.component.css'],
})
export class ProductDescriptionPageComponent implements OnInit {
  product: Product = {
    image: 'not-available',
    id: '',
    name: '',
    price: 0,
    category: '',
    rating: 0,
    description: '',
  };
  quantity: number = 1;
  totalPrice: number = 0.0;

  @Input()
  user!: User;
  loginStatus: LoginStatus = {isLoggedIn:false, id: '', role: 'user'};

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      let id = param.get('id') ?? '';
      this.productService.getProductbyId(id).subscribe((data) => {
        this.product = data;
        this.totalPrice = data.price;
      });
    });

    this.loginStatus = JSON.parse(
      localStorage.getItem('loginStatus') ??
        JSON.stringify({ isLoggedIn: false, id: '', role: '' })
    );

  }

  add() {
    this.quantity++;
    this.totalPrice = this.product.price * this.quantity;
  }
  subtract(){
    if(this.quantity>1){
      this.quantity--;
      this.totalPrice=this.product.price*this.quantity;
    }
    
  }

  addItemToCart() {
    const item: Item = {
      id: this.product.id,
      name: this.product.name,
      quantity: this.quantity,
      price: this.totalPrice,
      image: this.product.image,
    };

    this.cartService.getCart(this.loginStatus.id).subscribe({
      next: (data) => {
        let cart: Cart = data;
        cart.items.push(item);
        cart.subtotal += item.price;

        this.cartService.addToCart(cart).subscribe((resp) => {
          console.log('Item added to cart:', resp);
          this.router.navigate(['/cart']);
        });
      },
      error: (err) => {},
    });
  }
}
