import { PhongBan } from './../models/phong-ban';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Global } from './../global/global';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
      body: phongBan,
    };
    return this.httpClient.delete(Global.API_DELTETE, httpOptions);
  }

  updatePhongBan(phongBan): Observable<any> {
    const httpOptions = {
      headers: this.headers_object,
    };
    // console.log(phongBan)
    return this.httpClient.put(Global.API_UPDATE, phongBan, httpOptions);
  }

  fetchListProvince(): Observable<any> {
    const httpOptions = {
      headers: this.headers_object,
    };
    return this.httpClient
      .get<any>(Global.API_GET_ALL_PROVINCE, httpOptions)
      .pipe(map((data) => data.data));
  }

  fetchDistrictWithProvince(provinceId): Observable<any> {
    const params = new HttpParams().set('provinceId', provinceId);
    console.log(provinceId);

    const httpOptions = {
      headers: this.headers_object,
      params: params
    };
    return this.httpClient
      .get<any>(Global.API_GET_DISTRICT_WITH_PROVINCE, httpOptions)
      .pipe(map((data) => data.data));
  }

  fetchCommuneWithDistrict(districtId): Observable<any> {
    const params = new HttpParams().set('districtId', districtId);

    const httpOptions = {
      headers: this.headers_object,
      params: params
    };
    return this.httpClient
      .get<any>(Global.API_GET_COMMUNE_WITH_DISTRICT, httpOptions)
      .pipe(map((data) => data.data));
  }
}
