import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //for sake of developing request to local server
  private _registerUrl = 'http://localhost:3000/register';
  private _loginUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
