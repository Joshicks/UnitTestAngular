import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/login.model';
import { LoginService } from '../services/login.service';
import { UtilService } from '../services/util.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin?: FormGroup;
  isLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private logSrv: LoginService,
    private router: Router,
    private utilSvc: UtilService
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginClicked() {
    this.isLoading = true;
    console.log('loginClicked');
    console.log(this.formLogin?.value);
    const request = this.formLogin?.value as LoginRequest;
    this.logSrv.login(request).subscribe({
      next: (response) => {
        console.log('RESPUESTA', response);
        this.utilSvc.saveToken(response.token);
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log('ERROR', err);
      },
      complete: () => {
        this.isLoading = false;
        console.log('COMPLETED');
      },
    });
    console.log('PETICION ENVIADA');
  }
}
