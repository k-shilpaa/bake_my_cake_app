import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { ProductDescriptionPageComponent } from './product-description-page/product-description-page.component';
import { AppComponent } from './app.component';
import { ProductListingPageComponent } from './product-listing-page/product-listing-page.component';
import { CartComponent } from './cart/cart.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { OrderComponent } from './order/order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './services/auth.guard';
import { adminGuard } from './services/admin.guard';
import { signupGuard } from './services/signup.guard';

const routes: Routes = [
  {path:"",component:ProductListingPageComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"product-description-page/:id",component:ProductDescriptionPageComponent},
  {path:"cart",component:CartComponent,canActivate:[authGuard]},
  {path:"shipping",component:ShippingDetailsComponent,canActivate:[authGuard],canDeactivate:[signupGuard]},
  {path:"order/:id",component:OrderComponent,canActivate:[authGuard]},
  {path:"order-history",component:OrderHistoryComponent,canActivate:[authGuard]},
  {path:"admin",component:AdminComponent,canActivate:[adminGuard]},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
