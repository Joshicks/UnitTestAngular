import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent implements OnInit {
  formComputer: FormGroup;
  computerId!: number;
  computer?: Computer;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private computerService: ComputerService,
    private router: Router
  ) {
    this.computer = {} as Computer;

    this.formComputer = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.computerId = params['id'];

      this.computerService
        .getComputer(this.computerId)
        .subscribe((computer) => {
          this.computer = computer;
          this.formComputer.patchValue({
            brand: computer.brand,
            model: computer.model,
          });
        });
    });
  }

  saveComputer() {
    const updatedComputer: Computer = {
      id: this.computer?.id,
      brand: this.formComputer?.get('brand')?.value,
      model: this.formComputer?.get('model')?.value,
    };

    this.computerService
      .updateComputer(this.computerId, updatedComputer)
      .subscribe({
        next: () => {
          this.router.navigate(['computers']);
        },
        error: (err) => {
          alert('Error updating' + err);
        },
      });
  }
}
