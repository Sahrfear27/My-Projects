import { AuthorizationServiceService } from '../Services/authorization-service.service';
import { ReviewServiceService } from '../Services/review-service.service';
import { MedicationService } from '../Services/medication.service';
import { MedicationType, ReviewType } from '../Types/types';
import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  template: `
    <div [ngClass]="{ container: true }">
      <div [ngClass]="{ formcontainer: true }">
        <h2>Add Reviews</h2>
        <form [formGroup]="form" (ngSubmit)="handleAdd()">
          <div [ngClass]="{ formgroup: true }">
            <label>New Review</label>
            <input type="text" formControlName="review" placeholder="review" />
          </div>
          <div [ngClass]="{ formgroup: true }">
            <label>Rating</label>
            <input type="number" formControlName="rating" />
          </div>

          <button [disabled]="form.invalid">Submit</button>
        </form>
      </div>
    </div>
  `,
  styleUrl: `./reviews.component.css`,
})
export class AddReviewComponent {
  readonly notification = inject(ToastrService);
  readonly medService = inject(MedicationService);
  readonly routes = inject(Router);
  readonly authServices = inject(AuthorizationServiceService);
  readonly reviewServices = inject(ReviewServiceService);
  form = inject(FormBuilder).nonNullable.group({
    review: ['', Validators.required],
    rating: [0, [Validators.required, Validators.max(5)]],
  });

  get review() {
    return this.form.controls.review;
  }

  get rating() {
    return this.form.controls.rating;
  }

  validateRating(control: AbstractControl) {
    const rate = control.value;
    if (rate > 5) {
      return { invalid: true };
    } else {
      return null;
    }
  }
  newData = this.routes.getCurrentNavigation()?.extras.state as MedicationType;

  constructor() {}
  handleAdd() {
    const newReview = this.form.value as ReviewType;

    this.reviewServices.addReview(this.newData._id, newReview).subscribe({
      next: (response) => {
        if (response.success) {
          this.reviewServices.$reviewState.set(newReview);
          this.notification.success('Add Successful');
          this.form.reset();
        } else {
          this.notification.error('Fail to Add');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
