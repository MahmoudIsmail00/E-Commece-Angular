import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { SelectComponent } from "../../../shared/components/select/select.component";
import { ProductComponent } from '../product/product.component';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, SelectComponent,ProductComponent,RouterLink],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {

  products:Product[] = [];
  categories:string[] = [];
  selectedCategory:string = '';
  loading:boolean = false;

  cartPoducts:any[] = [];

  constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.loading = true;
    this._ProductsService.getAllProducts().subscribe({
      next: (res:any)=>{
        this.products = res;
        this.loading = false;
      },
      error:(error) => {
        alert("error");
        console.log(error.message);
        this.loading = false;
      }
    })
  };

  getCategories(){
    this.loading = true;
    this._ProductsService.getAllCategories().subscribe({
      next: (data:any)=>{this.categories = data ; this.loading = false;},
      error: (error) =>{alert('error'); console.log(error.message);
      }
    })
  }
      //next: (data:any)=>{this.categories = data.map((item:any)=>{return item.name}) ; this.loading = false;},

  filteredItems(): any[] {
    this.loading = true;
    let items = this.products.filter(item =>
      (this.selectedCategory === '' || item.category === this.selectedCategory)
      // &&item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.loading = false;
    return items;
  }

  filterCategory(event:any){
    this.selectedCategory = event.target.value;
    // this.getProductCategory(value);
  }

  // getProductCategory(category:string){
  //   this._ProductsService.getProductByCategory(category).subscribe({
  //     next:(data:any)=> {this.products = data}
  //   });
  //  }


  addToCart(event:any){
    //console.log(event);
    //JSON.stringify(); //send data
    //JSON.parse();  //Recieve data

    if("cart" in localStorage){
      this.cartPoducts = JSON.parse(localStorage.getItem("cart")!);
      let exists = this.cartPoducts.find(x=>x.item.id == event.item.id);
      if(exists){
        alert("item is already exists");
      }else{
        this.cartPoducts.push(event);
        localStorage.setItem("cart",JSON.stringify(this.cartPoducts));
      }
    }else{
      this.cartPoducts.push(event);
      localStorage.setItem("cart",JSON.stringify(this.cartPoducts));
    }
  }
}
