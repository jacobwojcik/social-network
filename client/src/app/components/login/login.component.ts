import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUserData = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private _auth: AuthService, private _router: Router) {}

  loginUser() {
    this._auth.loginUser(this.loginUserData.value).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/feed']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
