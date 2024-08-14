import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [SpinnerComponent,NgIf,RouterLink,FormsModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})
export class ProductsDetailsComponent implements OnInit{
  id:any;
  product:any;
  loading:boolean = false;
  addflag:boolean = false;
  amount:number = 0;
  cartPoducts:any[] = [];

  itemData:any;


  constructor(private route:ActivatedRoute, private _ProductsService:ProductsService, private _router:Router){
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);

  }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.loading = true;
    this._ProductsService.getSingleProduct(this.id).subscribe({
      next:(data)=> {
        this.product = data;
        this.loading = false;

      },
      error: (error)=>{
        this.loading = false;
        alert(error);
      }
    });
  }

  sendCart(){
    if(this.amount < 0){
      this.amount = 0
    }
    this.itemData = {item:this.product, quantity:this.amount};

    if("cart" in localStorage){
      this.cartPoducts = JSON.parse(localStorage.getItem("cart")!);
      let exists = this.cartPoducts.find(x=>x.item.id == this.itemData.item.id);
      if(exists){
        alert("item is already exists");
      }else{
        this.cartPoducts.push(this.itemData);
        localStorage.setItem("cart",JSON.stringify(this.cartPoducts));
      }
    }else{
      this.cartPoducts.push(event);
      localStorage.setItem("cart",JSON.stringify(this.cartPoducts));
    }
    alert('item added successfully');
    setTimeout(() => {
      this._router.navigate(['/products'])
    }, 1000);
  }
 }


/*
et item = data as Array<any>;
        this.product = item[0];
        console.log(this.product);
        this.loading = false;

*/
