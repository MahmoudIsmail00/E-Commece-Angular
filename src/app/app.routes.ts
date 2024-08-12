import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { Routes } from '@angular/router';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [

  {path:"Home",component:HomeComponent},
  {path:"products",component:AllProductsComponent},
  {path:"details/:id",component:ProductsDetailsComponent},
  {path:"cart",component:CartComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignUpComponent},
  {path:"**", redirectTo:'Home', pathMatch:"full"},
];
