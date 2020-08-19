import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerUserData = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  registerValidation = {
    status: false,
    message: '',
  };
  constructor(private _auth: AuthService, private _router: Router) {}

  registerUser() {
    this._auth.registerUser(this.registerUserData.value).subscribe(
      (res) => {
        this._router.navigate(['/login']);
      },
      (err) => {
        this.registerValidation.status = true;
        this.registerValidation.message = err.error;
        this.registerUserData.setValue({ login: '', password: '', email: '' });
      }
    );
  }
}
