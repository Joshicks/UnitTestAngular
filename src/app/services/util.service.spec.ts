import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token', () => {
    spyOn(localStorage, 'setItem');
    spyOn(service.isLogged, 'next');
    const token = 'example-token';
    service.saveToken(token);
    expect(localStorage.setItem).toHaveBeenCalledWith('TOKEN', token);
    expect(service.isLogged.next).toHaveBeenCalledWith(true);
  });

  it('should get token', () => {
    spyOn(localStorage, 'getItem');
    service.getToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('TOKEN');
  });

  it('should delete token', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(service.isLogged, 'next');
    service.deleteToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('TOKEN');
    expect(service.isLogged.next).toHaveBeenCalledWith(false);
  });
});
