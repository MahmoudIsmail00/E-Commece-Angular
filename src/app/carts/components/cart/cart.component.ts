import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartsService } from '../../services/carts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SpinnerComponent,NgFor,FormsModule,NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartProducts:any[] = [];
  total:number = 0;
  Math = Math;
  success:boolean = false;
  loading:boolean = false;

  currUser:any;

  constructor(private _CartsService:CartsService, private _router:Router){}

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
    this.loading = true;
    this.total = 0;
    for(let x of this.cartProducts){
      this.total += (x.item.price * x.quantity);
    }
    this.loading = false;
  }

  updateQuantity(){
    for(let item of this.cartProducts){
      if(item.quantity < 0)
        item.quantity = 0
    }
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
    this.loading = true;
    this.cartProducts.splice(index,1);
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    this.loading = false;
  }
  clearCart(){
    this.loading = true;
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    this.loading = false;
  }

  postCart(){
    let productsById = this.cartProducts.map((item)=>{
     return {productId:item.item.id, quantity: item.quantity}
    })
    this.currUser =  JSON.parse(localStorage.getItem("currentUser")!);
    if(this.currUser != null ){
      let Model = {
        userId: this.currUser.id,
        date: new Date(),
        products:productsById
      }
      this._CartsService.createNewCart(Model).subscribe({
        next: (res) => {this.success = true}
      })
      console.log(Model);
      setTimeout(() => {
        this._router.navigate(['/products']);
      }, 2000);
    }else{
      alert('you must log in');
    }
  }
}
