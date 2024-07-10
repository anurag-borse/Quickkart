import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { ViewProductsComponent } from './app/view-products/view-products.component';
import { AuthService } from './app/quickKart-services/auth/auth.service';
import { CartComponent } from './app/cart/cart.component';
import { ViewPurchasesComponent } from './app/purchase/purchase.component';
import { RatingComponent } from './app/rating/rating.component';
import { CommonLayoutComponent } from './app/common-layout/common-layout.component';
import { ViewCartComponent } from './app/view-cart/view-cart.component';
import { UpdateCartComponent } from './app/update-cart/update-cart.component';
import { UpdateReviewComponent } from './app/update-review/update-review.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'viewProducts', component: ViewProductsComponent, canActivate: [AuthService] },
  { path: 'viewPurchase', component: ViewPurchasesComponent, canActivate: [AuthService] },
  { path: 'rating', component: RatingComponent, canActivate: [AuthService] },
  { path: 'commonLayout', component: CommonLayoutComponent, canActivate: [AuthService] },
  { path: 'viewCart', component: ViewCartComponent },
  { path: 'updateCart/:productId/:productName/:quantity/:quantityAvailable', component: UpdateCartComponent },
  { path: 'updateReview/:productId/:productName/:reviewRating/:reviewComments', component: UpdateReviewComponent },
  


  


];



export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
