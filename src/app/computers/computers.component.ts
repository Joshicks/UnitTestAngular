import { Component, OnInit } from '@angular/core';
import { Computer } from '../model/computer.model';
import { ComputerService } from '../services/computer.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css'],
})
export class ComputersComponent implements OnInit {
  computers = new MatTableDataSource<Computer>();
  displayedColumns = ['id', 'brand', 'model', 'actions'];
  constructor(private computerService: ComputerService) {}
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.computerService.getComputers().subscribe({
      next: (list) => {
        this.computers.data = list;
      },
      error: (error) => {
        alert('There was an error: ' + error.message);
      },
    });
  }
  deleteComputer(item: Computer) {
    if (item.id) {
      if (confirm('Are you sure you want to delete this computer?')) {
        this.computerService.deleteComputer(item.id).subscribe({
          next: () => {
            this.loadData();
          },
          error: (err) => {
            alert('There was an error deleting the computer.');
          },
        });
      }
    } else {
      alert('The Computer object does not have a valid ID.');
    }
  }
}
