import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicationService } from '../Services/medication.service';
import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, mergeMap } from 'rxjs';

@Component({
  selector: 'app-add-medication',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle],
  template: `
    <div [ngClass]="{ container: true }">
      <div [ngClass]="{ formcontainer: true }">
        <h2>Add New Drugs</h2>
        <form [formGroup]="form" (ngSubmit)="handleAdd()">
          <div [ngClass]="{ formgroup: true }">
            <label>Drugs Name</label>
            <input type="text" formControlName="name" placeholder="med_name" />
            @if(name.hasError('exist')){
            <span [ngStyle]="{ 'font-size': 'xx-small', color: 'red' }"
              >Already Exist</span
            >
            }
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
            <input
              type="file"
              formControlName="image"
              (change)="setFile($event)"
            />
          </div>

          <button
            [disabled]="form.invalid"
            [ngClass]="{ addMedicationButton: true }"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrl: `./medication.css`,
})
export class AddMedicationComponent {
  notification = inject(ToastrService);
  medService = inject(MedicationService);
  form = inject(FormBuilder).nonNullable.group({
    name: ['', { validators: [Validators.required], updateOn: 'change' }],
    generic_name: ['', [Validators.required]],
    medication_class: ['', [Validators.required]],
    availability: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });
  file!: File;
  handleUpload() {
    console.log(this.form.value);
    this.file;
  }

  setFile(event: Event) {
    const imageInput = event.target as HTMLInputElement;
    if (imageInput.files!.length > 0) {
      this.file = imageInput.files![0];
    }
  }

  get name() {
    return this.form.controls.name;
  }
  get generic_name() {
    return this.form.controls.generic_name;
  }
  get medication_class() {
    return this.form.controls.medication_class;
  }
  get availability() {
    return this.form.controls.availability;
  }

  ngOnInit(): void {
    this.name.valueChanges
      .pipe(
        debounceTime(1000),
        mergeMap((name) => this.medService.checkMedicationByName(name))
      )
      .subscribe({
        next: (response) => {
          if (response.exist) {
            this.name.setErrors({ exist: true });
          } else {
            this.name.setErrors(null);
          }
        },
        error: () => {
          this.name.setErrors({ exist: true });
        },
      });
  }

  handleAdd() {
    const formData = new FormData();
    formData.append('name', this.name.value);
    formData.append('generic_name', this.generic_name.value);
    formData.append('medication_class', this.medication_class.value);
    formData.append('availability', this.availability.value);
    formData.append('medication_image', this.file);

    this.medService.addMedication(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.medService.$drugState.update((preDrugs) => [
            ...preDrugs,
            response.data,
          ]);
          this.notification.success('Add Successful');
          this.form.reset();
        }
      },
      error: (error) => {
        this.notification.error('Fail to Add');
      },
    });
  }
}
