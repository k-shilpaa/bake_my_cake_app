import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../services/userlogin.service';
import { LoginStatus } from '../models/loginStatus';
import { User } from '../models/user';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: User[];
  cartLength: number = 0;

  constructor(
    private userLoginService: UserloginService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getuserlogin();
    this.getCartLength(this.loginStatus.id)
  }
  loginStatus: LoginStatus = { isLoggedIn: false, id: 'default', role: 'user' };

  getuserlogin() {
    // get email from local storage
    const defLoginStatus: LoginStatus = {
      isLoggedIn: false,
      id: 'default',
      role: 'user',
    };
    this.loginStatus = JSON.parse(
      localStorage.getItem('loginStatus') ?? JSON.stringify(defLoginStatus)
    );

    // if logged in check if really logged in by querying the server and update the local storage
    if (this.loginStatus.isLoggedIn) {
      this.userLoginService.getLoginStatus(this.loginStatus.id).subscribe({
        next: (data) => {
          this.loginStatus = data;
          localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  userLogout() {
    this.loginStatus.isLoggedIn = false;
    this.userLoginService.putLoginStatus(this.loginStatus).subscribe({
      next: (data) => {
        localStorage.removeItem('loginStatus');
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCartLength(email: string) {
    this.cartService.getCart(email).subscribe({
      next: (data) => {
        this.cartLength = data.items.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
