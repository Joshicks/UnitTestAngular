import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ComputerService } from './computer.service';
import { Computer } from '../model/computer.model';

describe('ComputerService', () => {
  let service: ComputerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComputerService],
    });
    service = TestBed.inject(ComputerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getComputers', () => {
    it('should return an observable of computers', () => {
      const mockComputers: Computer[] = [
        { id: 1, brand: 'HP', model: 'Pavilion' },
        { id: 2, brand: 'Dell', model: 'Inspiron' },
      ];

      service.getComputers().subscribe((computers) => {
        expect(computers).toEqual(mockComputers);
      });

      const req = httpMock.expectOne('http://localhost:3000/computers');
      expect(req.request.method).toBe('GET');
      req.flush(mockComputers);
    });
  });

  describe('saveComputer', () => {
    it('should save the computer and return an observable of the saved computer', () => {
      const mockComputer: Computer = { brand: 'Lenovo', model: 'IdeaPad' };

      service.saveComputer(mockComputer).subscribe((computer) => {
        expect(computer).toEqual({ id: 1, ...mockComputer });
      });

      const req = httpMock.expectOne('http://localhost:3000/computers');
      expect(req.request.method).toBe('POST');
      req.flush({ id: 1, ...mockComputer });
    });
  });

  describe('deleteComputer', () => {
    it('should delete the computer with the specified id', () => {
      const mockId = 1;

      service.deleteComputer(mockId).subscribe();

      const req = httpMock.expectOne(
        `http://localhost:3000/computers/${mockId}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('getComputer', () => {
    it('should return an observable of the computer with the specified id', () => {
      const mockId = 1;
      const mockComputer: Computer = {
        id: mockId,
        brand: 'HP',
        model: 'Pavilion',
      };

      service.getComputer(mockId).subscribe((computer) => {
        expect(computer).toEqual(mockComputer);
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/computers/${mockId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockComputer);
    });
  });
  describe('updateComputer', () => {
    it('should send a PATCH request with the updated computer data', () => {
      const computerId = 1;
      const updatedComputer: Computer = {
        brand: 'Dell',
        model: 'Latitude 5490',
      };

      service.updateComputer(computerId, updatedComputer).subscribe();

      const req = httpMock.expectOne(
        `http://localhost:3000/computers/${computerId}`
      );
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(updatedComputer);

      req.flush(updatedComputer);
    });

    it('should return the updated computer data', () => {
      const computerId = 1;
      const updatedComputer: Computer = {
        id: computerId,
        brand: 'Dell',
        model: 'Latitude 5490',
      };

      service
        .updateComputer(computerId, updatedComputer)
        .subscribe((computer) => {
          expect(computer).toEqual(updatedComputer);
        });

      const req = httpMock.expectOne(
        `http://localhost:3000/computers/${computerId}`
      );
      req.flush(updatedComputer);
    });
  });
});
