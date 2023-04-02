import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NEVER, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NewComputerComponent } from './new-computer.component';
import { ComputerService } from 'src/app/services/computer.service';

describe('NewComputersComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;
  let computerSvcSpy: jasmine.SpyObj<ComputerService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    computerSvcSpy = jasmine.createSpyObj<ComputerService>('ComputerService', [
      'saveComputer',
    ]);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [NewComputerComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'computers', redirectTo: '' }]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computerSvcSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formComputer).toBeTruthy();
  });

  it('should create Computer', () => {
    computerSvcSpy.saveComputer.and.returnValue(of([]));
    component.formComputer?.patchValue({
      brand: 'ASUS',
      model: 'ROG',
    });

    component.saveComputer();

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['computers']);
  });

  it('should create Computer error', () => {
    const errorMessage = 'An error occurred while saving the computer.';
    computerSvcSpy.saveComputer.and.returnValue(throwError(errorMessage));

    component.formComputer?.patchValue({
      brand: 'ASUS',
      model: 'ROG',
    });

    component.saveComputer();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe(errorMessage);
  });
});
