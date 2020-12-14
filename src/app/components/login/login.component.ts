import { Router, Routes } from '@angular/router';
import { Global } from './../../global/global';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

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
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.loginService.login(this.user).subscribe(
      (data) => {

        switch (data.code) {
          case 200:
            console.log(data.data);
            this.router.navigate(['/board']);
          case 404:
            this.isError = true;
          case 401:
            this.isError = true;
          case 500:
        }
      },
      (error) => {
        if(error){
          this.isError = true
        }
      }
    );
  }
}
