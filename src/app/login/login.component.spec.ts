import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { LoginService } from '../services/login.service';
import { UtilService } from '../services/util.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilderSpy: jasmine.SpyObj<FormBuilder>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['saveToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderSpy },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    formBuilderSpy.group.and.returnValue(
      new FormBuilder().group({
        email: '',
        password: '',
      })
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loginClicked', () => {
    it('should set isLoading to false and log error on error', () => {
      const loginRequest: LoginRequest = {
        email: 'test@test.com',
        password: 'password',
      };
      const error = { message: 'Error' };

      loginServiceSpy.login.and.returnValue(throwError(error));
      console.log = jasmine.createSpy('log');

      component.formLogin?.setValue(loginRequest);
      component.loginClicked();

      expect(component.isLoading).toBeFalse();
      expect(console.log).toHaveBeenCalledWith('ERROR', error);
    });

    it('should set isLoading to false on complete', () => {
      const mockResponse: LoginResponse = {
        token: 'mockToken',
      };

      loginServiceSpy.login.and.returnValue(of(mockResponse));

      component.loginClicked();

      expect(component.isLoading).toBeFalse();
    });
  });
});
