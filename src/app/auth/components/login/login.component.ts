import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private _router:Router){}
  loggedUser!:any;
  user!:User;
  users:User[] = [];

  form = new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  })

  onSubmit(){
    this.loggedUser = {
      email: this.form.controls.email.value!,
      password: this.form.controls.password.value!,
    };
    this.users = JSON.parse(localStorage.getItem("users")!);
    let exists = this.users.find(x=>x.email == this.loggedUser.email);
    if(exists){
      this.user = exists
      if(this.loggedUser.password == exists.password){
        alert('Welcome back');
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
