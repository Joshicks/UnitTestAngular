import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private utilSvc: UtilService) {}
  canActivate(): boolean {
    const isLogged = Boolean(this.utilSvc.getToken());
    return isLogged;
  }
}
