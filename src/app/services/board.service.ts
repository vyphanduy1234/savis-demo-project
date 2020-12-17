import { PhongBan } from './../models/phong-ban';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Global } from './../global/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private httpClient: HttpClient) {}

  headers_object = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + localStorage.getItem(Global.JWT_KEY)
  );

  fetchListPhongBan(): Observable<PhongBan[]> {
    const httpOptions = {
      headers: this.headers_object,
    };
    return this.httpClient
      .get<any>(Global.API_ENDPOINT, httpOptions)
      .pipe(map((data) => data.data.data));
  }

  deletePhongBan(phongBan): Observable<any> {
    const httpOptions = {
      headers: this.headers_object,
      body: phongBan
    };
    console.log(phongBan);
    return this.httpClient.delete(Global.API_DELTETE,httpOptions);
  }
}
