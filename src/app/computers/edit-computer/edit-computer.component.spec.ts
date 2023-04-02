import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

import { EditComputerComponent } from './edit-computer.component';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;
  let computerServiceSpy: jasmine.SpyObj<ComputerService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    activatedRouteStub = {
      params: of({ id: 1 }),
    };

    const spy = jasmine.createSpyObj('ComputerService', [
      'getComputer',
      'updateComputer',
    ]);

    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ComputerService, useValue: spy },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;

    computerServiceSpy = TestBed.inject(
      ComputerService
    ) as jasmine.SpyObj<ComputerService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get computer details on init', () => {
    const computer: Computer = {
      id: 1,
      brand: 'Test Brand',
      model: 'Test Model',
    };
    computerServiceSpy.getComputer.and.returnValue(of(computer));

    component.ngOnInit();

    expect(component.computer).toEqual(computer);
    expect(component.formComputer.get('brand')?.value).toEqual(computer.brand);
    expect(component.formComputer.get('model')?.value).toEqual(computer.model);
  });

  it('should update computer and navigate to computers page', () => {
    const computer: Computer = {
      id: 1,
      brand: 'Test Brand',
      model: 'Test Model',
    };
    const updatedComputer: Computer = {
      id: 1,
      brand: 'Updated Brand',
      model: 'Updated Model',
    };
    computerServiceSpy.getComputer.and.returnValue(of(computer));
    computerServiceSpy.updateComputer.and.returnValue(of(updatedComputer));

    component.ngOnInit();

    component.formComputer.patchValue({
      brand: 'Updated Brand',
      model: 'Updated Model',
    });

    component.saveComputer();

    expect(computerServiceSpy.updateComputer).toHaveBeenCalledWith(
      1,
      updatedComputer
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['computers']);
  });
  it('should handle errors when updating computer', () => {
    const computer: Computer = {
      id: 1,
      brand: 'Test Brand',
      model: 'Test Model',
    };
    const error = new Error('Update failed');
    computerServiceSpy.getComputer.and.returnValue(of(computer));
    computerServiceSpy.updateComputer.and.returnValue(throwError(error));

    spyOn(window, 'alert');

    component.ngOnInit();

    component.formComputer.patchValue({
      brand: 'Updated Brand',
      model: 'Updated Model',
    });

    component.saveComputer();

    expect(computerServiceSpy.updateComputer).toHaveBeenCalledWith(
      1,
      jasmine.objectContaining({
        brand: 'Updated Brand',
        model: 'Updated Model',
      })
    );
    expect(window.alert).toHaveBeenCalledWith('Error updating' + error);
  });
});
