import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComputerService } from '../services/computer.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ComputersComponent } from './computers.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Computer } from '../model/computer.model';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;
  let computerService: ComputerService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatTableModule,
        MatIconModule,
      ],
      declarations: [ComputersComponent],
      providers: [ComputerService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    computerService = TestBed.inject(ComputerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load computers on init', () => {
    const computers: Computer[] = [
      { id: 1, brand: 'Dell', model: 'Inspiron' },
      { id: 2, brand: 'HP', model: 'Pavilion' },
    ];
    spyOn(computerService, 'getComputers').and.returnValue(of(computers));
    component.ngOnInit();
    expect(computerService.getComputers).toHaveBeenCalled();
    expect(component.computers.data).toEqual(computers);
  });

  it('should delete a computer', () => {
    const computer: Computer = { id: 1, brand: 'Dell', model: 'Inspiron' };
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(computerService, 'deleteComputer').and.returnValue(of({}));
    spyOn(component, 'loadData');
    component.deleteComputer(computer);
    expect(window.confirm).toHaveBeenCalled();
    expect(computerService.deleteComputer).toHaveBeenCalledWith(1);
    expect(component.loadData).toHaveBeenCalled();
  });

  it('should handle errors when deleting a computer', () => {
    const computerService = TestBed.inject(ComputerService);
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(computerService, 'deleteComputer').and.returnValue(
      throwError({ status: 404 })
    );
    const alertSpy = spyOn(window, 'alert');
    const loadDataSpy = spyOn<any>(component, 'loadData');
    const computer: Computer = { id: 1, brand: 'Brand', model: 'Model' };
    component.deleteComputer(computer);
    expect(window.confirm).toHaveBeenCalled();
    expect(computerService.deleteComputer).toHaveBeenCalledWith(computer.id!);
    expect(alertSpy).toHaveBeenCalledWith(
      'There was an error deleting the computer.'
    );
    expect(loadDataSpy).not.toHaveBeenCalled();
  });
  it('should handle a Computer object without a valid ID', () => {
    const computer: Computer = { brand: 'Brand', model: 'Model' };
    const alertSpy = spyOn(window, 'alert');
    component.deleteComputer(computer);
    expect(alertSpy).toHaveBeenCalledWith(
      'The Computer object does not have a valid ID.'
    );
  });
  it('should handle errors when loading computers', () => {
    const computerService = TestBed.inject(ComputerService);
    spyOn(computerService, 'getComputers').and.returnValue(
      throwError({ message: 'test error message' })
    );
    const alertSpy = spyOn(window, 'alert');
    component.loadData();
    expect(alertSpy).toHaveBeenCalledWith(
      'There was an error: test error message'
    );
  });
});
