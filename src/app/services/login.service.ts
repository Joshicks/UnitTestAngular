import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://reqres.in/api/login', req);
  }
}
