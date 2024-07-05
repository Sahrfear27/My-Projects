import { MedicationService } from '../Services/medication.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { MedicationType } from '../Types/types';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-medication',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div [ngClass]="{ container: true }">
      <div [ngClass]="{ formcontainer: true }">
        <h2>Add New Drugs</h2>
        <form [formGroup]="form" (ngSubmit)="handleUpdate()">
          <div [ngClass]="{ formgroup: true }">
            <label>Drugs Name</label>
            <input type="text" formControlName="name" placeholder="med_name" />
          </div>
          <div [ngClass]="{ formgroup: true }">
            <label>Generic Name</label>
            <input
              type="text"
              formControlName="generic_name"
              placeholder="generic_name"
            />
          </div>
          <div [ngClass]="{ formgroup: true }">
            <label>Class</label>
            <input
              type="text"
              formControlName="medication_class"
              placeholder="medication_class"
            />
          </div>
          <div [ngClass]="{ formgroup: true }">
            <label>Availability</label>
            <input
              type="text"
              formControlName="availability"
              placeholder="availability"
            />
          </div>
          <div [ngClass]="{ formgroup: true }">
            <span>Upload Drugs</span>
            <input type="file" (change)="setFile($event)" />
          </div>
          <button [disabled]="form.invalid">Submit</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./medication.css'],
})
export class UpdateMedicationComponent {
  readonly medServices = inject(MedicationService);
  readonly notification = inject(ToastrService);
  route = inject(Router);
  form = inject(FormBuilder).nonNullable.group({
    name: '',
    generic_name: '',
    medication_class: '',
    availability: '',
  });

  file!: File;
  data = this.route.getCurrentNavigation()?.extras.state as MedicationType;

  constructor() {
    this.form.controls.name.patchValue(this.data.name);
    this.form.controls.generic_name.patchValue(this.data.generic_name);
    this.form.controls.medication_class.patchValue(this.data.medication_class);
    this.form.controls.availability.patchValue(this.data.availability);
  }

  setFile(event: Event) {
    const imageInput = event.target as HTMLInputElement;
    if (imageInput.files!.length > 0) {
      this.file = imageInput.files![0];
    }
  }

  handleUpdate() {
    const formData = new FormData();
    formData.append('name', this.form.controls.name.value);
    formData.append('generic_name', this.form.controls.generic_name.value);
    formData.append(
      'medication_class',
      this.form.controls.medication_class.value
    );
    formData.append('availability', this.form.controls.availability.value);
    if (this.file) {
      formData.append('medication_image', this.file);
    }
    this.medServices.updateMedicationById(this.data._id, formData);
  }
}
