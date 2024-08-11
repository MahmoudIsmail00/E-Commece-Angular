import { Component } from '@angular/core';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

}
