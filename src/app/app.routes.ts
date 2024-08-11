import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { Routes } from '@angular/router';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './carts/components/cart/cart.component';

export const routes: Routes = [

  {path:"products",component:AllProductsComponent},
  {path:"details/:id",component:ProductsDetailsComponent},
  {path:"cart",component:CartComponent},
  {path:"**", redirectTo:'products', pathMatch:"full"},

];
