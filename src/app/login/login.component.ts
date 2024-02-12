import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/userLogin';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { UserloginService } from '../services/userlogin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../services/message.service';
import { LoginStatus } from '../models/loginStatus';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: (message) => {
        if (message !== '') {
          this.snackBar.open(message, 'Dismiss', {
            duration: 10000,
          });
          this.messageService.clearMessage();
        }
      },
    });
  }
  constructor(
    private userloginService: UserloginService,
    private router: Router,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  loginForm!: Form;
  userLogin: UserLogin = { email: '', password: '' };
  loginerror: string = '';

  onSubmit(loginForm: NgForm) {
    // variable decleration
    let loggedInStatus: LoginStatus = {
      isLoggedIn: false,
      id: '',
      role: '',
    };
    this.userloginService.getUser(loginForm.value.name).subscribe({
      next: (data) => {
        // if password is not matching
        if (data.password != loginForm.value.password) {
          this.loginerror = 'Password not matching';
        }
        // if all details match
        else {
          // update he user login status to logged in
          loggedInStatus.id = data.id;
          loggedInStatus.isLoggedIn = true;
          loggedInStatus.role = data.role;

          // put login status
          this.userloginService.putLoginStatus(loggedInStatus).subscribe({
            // on successful post add to local storage
            next: (data) => {
              localStorage.setItem(
                'loginStatus',
                JSON.stringify(loggedInStatus)
              );

              //if the role is admin route to /admin
              if (data.role === 'admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['']);
              }
            },
            error: (err) => {
              console.log('error');
            },
          });
        }
      },
      // user id does not exist which throws 404
      error: (err) => {
        this.loginerror = 'Invalid User Id';
        console.log(err);
      },
    });
  }
}
