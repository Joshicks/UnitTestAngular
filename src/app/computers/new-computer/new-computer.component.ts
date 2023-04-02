import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-new-computer',
  templateUrl: './new-computer.component.html',
  styleUrls: ['./new-computer.component.css'],
})
export class NewComputerComponent {
  formComputer?: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private computerSvc: ComputerService
  ) {
    this.formComputer = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
    });
  }

  saveComputer() {
    let data = this.formComputer?.value as Computer;
    this.computerSvc.saveComputer(data).subscribe({
      next: () => {
        this.router.navigate(['computers']);
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while saving the computer.';
      },
    });
  }
}
