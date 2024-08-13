import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private _router:Router,private _AuthService:AuthService){}

  loggedUser!:any;
  user!:User;
  users:User[] = [];
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    this._AuthService.getAllUsers().subscribe({
      next:(data)=>{this.users = data}
    })
  }

  form = new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  })


  login() {
    this._AuthService.login(this.email, this.password).subscribe(user => {
      if (user) {
        console.log('Logged in user:', user);
        this._router.navigate(['/products']); // Navigate to home or another route after login
      } else {
        alert('Login failed');
      }
    });
  }

  onSubmit(){
    this.loggedUser = {
      email: this.form.controls.email.value!,
      password: this.form.controls.password.value!,
    };

    let exists = this.users.find(x=>x.email == this.loggedUser.email);

    this._AuthService.getUser(Number(exists?.id)).subscribe({
      next:(res)=>{this.user = res}
    });

    if(exists){
      if(this.loggedUser.password == exists.password){
        alert('Welcome back');
        this.login();
        setTimeout(() => {
          this._router.navigate(['/products']);
        }, 1000);
      }else{
        alert('Invalid login');
      }
    }else{
      alert("This email doesn't exist");
    }
  }
}
