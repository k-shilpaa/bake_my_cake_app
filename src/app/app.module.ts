import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListingPageComponent } from './product-listing-page/product-listing-page.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDescriptionPageComponent } from './product-description-page/product-description-page.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { FilterComponent } from './filter/filter.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { OrderComponent } from './order/order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminComponent } from './admin/admin.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    ProductListingPageComponent,
    ProductCardComponent,
    NavBarComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    ProductDescriptionPageComponent,
    CartComponent,
    SearchComponent,
    FooterComponent,
    FilterComponent,
    ShippingDetailsComponent,
    OrderComponent,
    OrderHistoryComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
