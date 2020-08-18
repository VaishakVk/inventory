import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './../constants';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { User } from '../models/user';
import { Product } from '../models/product';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  apiURL = environment.apiURL;

  setAuthorizationHeader(): HttpHeaders {
    const token = this.storageService.getToken(Constants.TOKEN);
    return new HttpHeaders({
      Authorization: token,
    });
  }

  signup(email, name, password, phone): Observable<{ response: User }> {
    return this.http.post<{ response: User; status: boolean }>(
      `${this.apiURL}/${Constants.routes.auth}/${Constants.routes.signup}`,
      {
        email,
        name,
        password,
        phone,
      }
    );
  }

  createProduct(
    name,
    short_name,
    price,
    description
  ): Observable<{ status: boolean; response: Product }> {
    let options = { headers: this.setAuthorizationHeader() };
    return this.http.post<{ status: boolean; response: Product }>(
      `${this.apiURL}/${Constants.routes.products}`,
      {
        short_name,
        name,
        price,
        description,
      },
      options
    );
  }

  login(
    email,
    password
  ): Observable<{
    status: boolean;
    response: { token: string; user_details: User };
  }> {
    return this.http.post<{
      status: boolean;
      response: { token: string; user_details: User };
    }>(`${this.apiURL}/${Constants.routes.auth}/${Constants.routes.login}`, {
      email,
      password,
    });
  }

  listAllProducts(): Observable<{ status: Boolean; response: [Product] }> {
    let options = { headers: this.setAuthorizationHeader() };
    return this.http.get<{ status: boolean; response: [Product] }>(
      `${this.apiURL}/${Constants.routes.products}`,
      options
    );
  }

  getProduct(id): Observable<{ status: boolean; response: Product }> {
    let options = { headers: this.setAuthorizationHeader() };
    return this.http.get<{ status: boolean; response: Product }>(
      `${this.apiURL}/${Constants.routes.products}/${id}`,
      options
    );
  }

  deleteProducts(id: [string]): Observable<any> {
    const httpOptions = {
      body: { id: id },
      headers: this.setAuthorizationHeader(),
    };
    return this.http.request(
      'delete',
      `${this.apiURL}/${Constants.routes.products}/`,
      httpOptions
    );
  }

  getUser(): Observable<{ status: boolean; response: User }> {
    let options = { headers: this.setAuthorizationHeader() };
    return this.http.get<{ status: boolean; response: User }>(
      `${this.apiURL}/${Constants.routes.users}`,
      options
    );
  }
}
