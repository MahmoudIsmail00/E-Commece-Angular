import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/models/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  user:any;

  constructor(private _AuthService:AuthService,private _router:Router) {}

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      if("currentUser" in localStorage){
        this.user = JSON.parse(localStorage.getItem('currentUser')!);
      }else{
        this.user = user;
      }
    });
  }

  logout() {
    this._router.navigate(['/products']);
    this._AuthService.logout();
    this.user = null;
  }
}
