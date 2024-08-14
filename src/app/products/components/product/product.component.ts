import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgIf,FormsModule,RouterLink,NgClass ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  @Input() item!:Product;

  @Output() itemData = new EventEmitter();

  showView:boolean = false;
  addflag:boolean = false;

  amount:number = 0;
  constructor(){}

  ngOnInit(): void {

  }
  sendCart(){
    if(this.amount < 0){
      this.amount = 0
    }
    this.itemData.emit({item:this.item, quantity:this.amount});
    alert('item sent to cart successfuly')
  }
}
