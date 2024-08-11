import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [SpinnerComponent,NgIf],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})
export class ProductsDetailsComponent implements OnInit{
  id:any;
  product:any;
  loading:boolean = false;
  constructor(private route:ActivatedRoute, private _ProductsService:ProductsService){
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
}
