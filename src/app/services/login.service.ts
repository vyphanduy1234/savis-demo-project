import { Global } from './../global/global';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(user): Observable<any> {
  return this.httpClient.post(Global.API_AUTHEN,user)
  }
}
