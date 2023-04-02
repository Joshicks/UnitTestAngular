import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { LoginRequest, LoginResponse } from '../model/login.model';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a login request and receive a response', () => {
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password',
    };
    const expectedResponse: LoginResponse = { token: 'abcdef' };

    service.login(loginRequest).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne('https://reqres.in/api/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(loginRequest);
    req.flush(expectedResponse);
  });
});
