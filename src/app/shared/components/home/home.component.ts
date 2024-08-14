import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactUsComponent } from "../contact-us/contact-us.component";
import { AboutUsComponent } from "../about-us/about-us.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ContactUsComponent, AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
