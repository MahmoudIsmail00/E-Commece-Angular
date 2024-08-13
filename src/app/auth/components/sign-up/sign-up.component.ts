import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{



  constructor( private _router:Router, private _AuthService:AuthService){}

  user!:User;
  users:User[] = [];
  ctr:number = 1;

  done:boolean = false;

  ngOnInit(): void {
    this._AuthService.getAllUsers().subscribe({
      next:(res)=> this.users = res
    })
  }


  form = new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    confirmPassword:new FormControl(''),
    phone:new FormControl(''),
  })

  onSubmit() {
    this.done= false;
    this.user = {
      id:this.ctr.toString(),
      name: this.form.controls.name.value!,
      email: this.form.controls.email.value!,
      password: this.form.controls.password.value!,
      confirmPassword: this.form.controls.confirmPassword.value!,
      phone: this.form.controls.phone.value!
    };
      let nameexists = this.users.find(x=>x.name == this.user.name);

      let emailexists = this.users.find(x=>x.email == this.user.email);

      let phoneexists = this.users.find(x=>x.phone == this.user.phone);

      if(nameexists)
        {
            alert("This name is already taken");
        }
        else if(emailexists)
        {
          alert("This email is already taken");
        }
        else if(phoneexists)
        {
          alert("This phone is already taken");
        }
        else
        {
          let exists = this.users.find(x=>x.id == this.user.id);
          if(exists)
          {
            this.ctr++;
            this.user.id = this.ctr.toString();
            this.users.push(this.user);
          }
          else
          {
            this.users.push(this.user);
          }
          this._AuthService.addUser(this.user).subscribe((data)=>console.log(data));

          setTimeout(() => {
            this.done = true;
          }, 1000);
          setTimeout(() => {
            this._router.navigate(['/products']);
          }, 3000);
        }


  }
}


//       local storage
    // if("users" in localStorage){
    //   this.users = JSON.parse(localStorage.getItem("users")!);

    //   let nameexists = this.users.find(x=>x.name == this.user.name);
    //   let emailexists = this.users.find(x=>x.email == this.user.email);
    //   let phoneexists = this.users.find(x=>x.phone == this.user.phone);

    //   if(nameexists)
    //   {
    //       alert("This name is already taken");
    //   }
    //   else if(emailexists)
    //   {
    //     alert("This email is already taken");
    //   }

    //   else if(phoneexists)
    //   {
    //     alert("This phone is already taken");
    //   }
    //   else
    //   {
    //     let exists = this.users.find(x=>x.id == this.user.id);
    //     if(exists)
    //     {
    //       this.ctr++;
    //       this.user.id = this.ctr.toString();
    //       this.users.push(this.user);
    //     }
    //     else
    //     {
    //       this.users.push(this.user);
    //     }
    //     this._AuthService.addUser(this.user).subscribe((data)=>console.log(data));

    //     console.log(this.user);

    //     localStorage.setItem("users",JSON.stringify(this.users));

    //     setTimeout(() => {
    //       this.done = true;
    //     }, 1000);
    //     setTimeout(() => {
    //       this._router.navigate(['/products']);
    //     }, 3000);
    //   }
    // }else{
    //   this.users.push(this.user);
    //   console.log(this.user);
    //   this._AuthService.addUser(this.user).subscribe((data)=>console.log(data));

    //   localStorage.setItem("users",JSON.stringify(this.users));
    //   setTimeout(() => {
    //     this.done = true;
    //   }, 1000);
    //   setTimeout(() => {
    //     this._router.navigate(['/products']);
    //   }, 3000);
    // }
