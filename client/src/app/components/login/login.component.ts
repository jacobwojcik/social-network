import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUserData = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  loginValidation = {
    status: false,
    message: '',
  };
  constructor(private _auth: AuthService, private _router: Router) {}

  loginUser() {
    this._auth.loginUser(this.loginUserData.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.loginValidation.status = false;
        this._router.navigate(['/feed']);
      },
      (err) => {
        const typeOfError = err.error;
        this.loginValidation.status = true;
        this.loginValidation.message = typeOfError;
      }
    );
  }
}
