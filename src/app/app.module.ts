import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonLayoutComponent } from 'src/app/common-layout/common-layout.component';
import { HomeComponent } from './home/home.component';
import { routing } from 'src/app.routing';
import { RatingComponent } from './rating/rating.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';

import { ViewPurchasesComponent } from './purchase/purchase.component'
import { CartComponent } from './cart/cart.component'
import {ViewCartComponent  } from './view-cart/view-cart.component';
import { UpdateCartComponent } from './update-cart/update-cart.component';
import { UpdateReviewComponent } from './update-review/update-review.component'


@NgModule({
  declarations: [
    AppComponent,
    ViewProductsComponent,
    LoginComponent, RegisterComponent, CommonLayoutComponent, HomeComponent, RatingComponent, CustomerLayoutComponent, ViewPurchasesComponent,
    CartComponent,
    ViewCartComponent,
    UpdateCartComponent,
    UpdateReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, HttpClientModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

