import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserloginService } from '../services/userlogin.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { CartService } from '../services/cart.service';
import { CanDeactivateFn } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  user!: User;
  hasUnsavedChanges:boolean=false;

  ngOnInit(): void {}

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userloginService: UserloginService,
    private router: Router,
    private messageService: MessageService,
    private cartService: CartService
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4),Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: [''],
      email: ['', [Validators.required, this.checkIfGuestEmailsAreValid]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      confirmPassword: ['', [Validators.required, this.passwordsMatchValidator]],
    });
  }
  checkIfGuestEmailsAreValid(c: AbstractControl) {
    if (c.value !== '') {
      const emailString = c.value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|email\.com|yahoo\.com)$/i;
      const emails = emailString.split(',').map((e: string) => e.trim());

      // Check each email individually
      for (const email of emails) {
        if (!email.match(emailRegex)) {
          return { invalidGuestEmails: true };
        }
      }
    }
    return null;
  }
  passwordsMatchValidator(control: AbstractControl) {
    const password = control?.parent?.get('password')?.value;
    const confirmPassword = control?.value;
    if (password !== confirmPassword) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  checkValidation(){
    if(!this.hasUnsavedChanges){
      
      return alert('your changes might not be saved,are you sure you want to navigate???')

    }
    return true;

  }

  onSubmit(form: FormGroup) {
    this.user = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      id: form.value.email,
      password: form.value.password,
      role: 'user',
    };

    this.userloginService.postSignupUser(this.user).subscribe({
      next: (data) => {
        // on successfull signup post user login status, as its needed for first time
        this.userloginService
          .postLoginStatus({
            isLoggedIn: false,
            id: data.id,
            role: 'user',
          })
          .subscribe({
            next: (data) => {},
            error: (err) => {
              console.log(err);
            },
          });

        // create a default cart
        this.cartService.createDefaultCart(data.id).subscribe({
          next: (resp) => {},
          error: (err) => {
            console.log(err);
          },
        });

        // send message
        this.messageService.changeMessage('Sign Up Sucessfull!!!');
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  get firstName() {
    return this.signupForm.get('firstName');
  }
  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}
