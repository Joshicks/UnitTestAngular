import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';

describe('AuthService', () => {
  let authService: AuthService;
  let utilService: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UtilService],
    });
    authService = TestBed.inject(AuthService);
    utilService = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return true if the user is logged in', () => {
    spyOn(utilService, 'getToken').and.returnValue('some_token');

    const canActivate = authService.canActivate();

    expect(canActivate).toBe(true);
  });

  it('should return false if the user is not logged in', () => {
    spyOn(utilService, 'getToken').and.returnValue(null);

    const canActivate = authService.canActivate();

    expect(canActivate).toBe(false);
  });
});
