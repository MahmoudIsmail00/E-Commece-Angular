import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersApi:string = 'http://localhost:3000/users';
  user!:User;
  constructor(private _httpClient:HttpClient) { }

  getAllUsers():Observable<User[]>{
    return this._httpClient.get<User[]>(this.usersApi);
  }

  getUser(id:number):Observable<User>{
    return this._httpClient.get<User>(this.usersApi+'/' +id);
  }

  addUser(data:User):Observable<User>{
    return this._httpClient.post<User>(this.usersApi , data);
  }

  DeleteUser(id:number):Observable<User>{
    return this._httpClient.delete<User>(this.usersApi+id);
  }

  private userSubject = new BehaviorSubject<any>(null);

  get currentUser():Observable<any> {
    return this.userSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this._httpClient.get<any[]>(`${this.usersApi}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length) {
          const user = users[0];
          this.userSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data
          return user;
        } else {
          return null;
        }
      })
    );
  }

  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('currentUser'); // Clear user data
  }
}
