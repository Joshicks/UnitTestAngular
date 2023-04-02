import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Computer } from '../model/computer.model';

@Injectable({
  providedIn: 'root',
})
export class ComputerService {
  constructor(private http: HttpClient) {}
  getComputers() {
    return this.http.get<Computer[]>('http://localhost:3000/computers');
  }
  saveComputer(data: Computer) {
    return this.http.post('http://localhost:3000/computers', data);
  }
  deleteComputer(id: number) {
    return this.http.delete('http://localhost:3000/computers/' + id);
  }
  getComputer(id: number) {
    return this.http.get<Computer>('http://localhost:3000/computers/' + id);
  }
  updateComputer(id: number, computer: Computer) {
    return this.http.patch<Computer>(
      'http://localhost:3000/computers/' + id,
      computer
    );
  }
}
