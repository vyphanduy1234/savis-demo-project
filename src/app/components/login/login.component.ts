import { Router, Routes } from '@angular/router';
import { Global } from './../../global/global';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  U_PLACE_HOLDER: string = Global.U_PLACE_HOLDER;
  P_PLACE_HOLDER: string = Global.P_PLACE_HOLDER;

  isError = false;
  user = {
    username: '',
    password: '',
    rememberMe: true,
    applicationId: 'string',
  };
  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  isSpinnerShow = true;
  validateForm!: FormGroup;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      console.log(this.isSpinnerShow);

      //start login open spniner
      this.isSpinnerShow = !this.isSpinnerShow;
      this.login();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  login() {
    this.loginService.login(this.user).subscribe(
      (data) => {
        switch (data.code) {
          case 200:
            console.log(data.data);
            localStorage.setItem(Global.JWT_KEY, data.data.tokenString);
            //hide spinner
            this.isSpinnerShow = !this.isSpinnerShow;
            this.router.navigate(['/home']);
          case 404:
            this.isError = true;
          case 401:
            this.isError = true;
          case 500:
        }
      },
      (error) => {
        if (error) {
          this.isError = true;
        }
      }
    );
  }
}
