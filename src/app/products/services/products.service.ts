import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient:HttpClient) { }


  getAllProducts(){
    return this._httpClient.get(environment.baseApi + 'products');
  }

  getSingleProduct(id:number){
    return this._httpClient.get(environment.baseApi + 'products/' + id)
  }

  getAllCategories(){
    return this._httpClient.get(environment.baseApi + 'products/categories')
  }

  getProductByCategory(category:string){
    return this._httpClient.get(environment.baseApi + 'products/category/' + category);
  }
}

// return this._httpClient.get(environment.baseApi + 'products/?id=' + id)
