import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilService } from './services/util.service';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  template: '<span>Login</span>',
})
class MockingLoginComponent {}

describe('AppComponent', () => {
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
  let utilSvcSpy: jasmine.SpyObj<UtilService>;

  beforeEach(() => {
    utilSvcSpy = jasmine.createSpyObj<UtilService>('UtilService', [
      'getToken',
      'deleteToken',
      'isLogged',
    ]);
    utilSvcSpy.isLogged = new Subject<boolean>();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: MockingLoginComponent },
        ]),
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
      ],
      declarations: [AppComponent],
      providers: [
        { provide: UtilService, useValue: utilSvcSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-2023'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-2023');
  });

  it('should create app with the user not logged in', () => {
    utilSvcSpy.getToken.and.returnValue(null);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.isLogged).toBeFalse();
  });
  it('should receive isLogged from UtilSvc as true', () => {
    utilSvcSpy.getToken.and.returnValue('mock-token-value');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();
    utilSvcSpy.isLogged.next(true);
    fixture.detectChanges();

    expect(app.isLogged).toBeTrue();
  });
  it('should logOut', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();

    expect(utilSvcSpy.deleteToken).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['login']);
  });
});
