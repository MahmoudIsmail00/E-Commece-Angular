import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private _HttpClient:HttpClient) { }

  createNewCart(model:any){
    return this._HttpClient.post('http://localhost:3000/'+ 'carts/' , model);
  }
}


// constructor(private _HttpClient:HttpClient) { }

//   cartsApi:string = 'http://localhost:3000/carts';

//   getCarts():Observable<Cart[]>{
//     return this._HttpClient.get<Cart[]>(this.cartsApi);
//   }

//   getCart(id:number):Observable<Cart>{
//     return this._HttpClient.get<Cart>(this.cartsApi +id);
//   }

//   addCart(data:Cart):Observable<Cart>{
//     return this._HttpClient.post<Cart>(this.cartsApi , data);
//   }

//   DeleteCart(id:number):Observable<Cart>{
//     return this._HttpClient.delete<Cart>(this.cartsApi +id);
//   }
