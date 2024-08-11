import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SpinnerComponent,NgFor,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartProducts:any[] = [];
  total:number = 0;
  Math = Math;
  constructor(){}

  ngOnInit(): void {
    this.getCartProducts()
  }

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  }

  getCartTotal(){
    this.total = 0;
    for(let x of this.cartProducts){
      this.total += (x.item.price * x.quantity);
    }
  }

  updateQuantity(){
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }

  minsAmount(index:number){
    if(this.cartProducts[index].quantity>0){
      this.cartProducts[index].quantity--;
      this.getCartTotal();
      localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    }
  }
  plusAmount(index:number){
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));

  }
  deleteProduct(index:number){
    this.cartProducts.splice(index,1);
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }
  clearCart(){
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));

  }
}
