import { ReviewServiceService } from '../Services/review-service.service';
import { MedicationService } from '../Services/medication.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewType } from '../Types/types';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-review',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  template: `
    <div [ngClass]="{ container: true }">
      <div [ngClass]="{ formcontainer: true }">
        <h2>Edit Reviews</h2>
        <form [formGroup]="form" (ngSubmit)="handleUpdate()">
          <div [ngClass]="{ formgroup: true }">
            <label>New Review</label>
            <input type="text" formControlName="review" placeholder="review" />
          </div>
          <div [ngClass]="{ formgroup: true }">
            <label>Rating</label>
            <input
              type="number"
              formControlName="rating"
              placeholder="rating"
            />
          </div>

          <button [disabled]="form.invalid">Update</button>
        </form>
      </div>
    </div>
  `,
  styleUrl: `./reviews.component.css`,
})
export class UpdateReviewComponent {
  readonly reviewService = inject(ReviewServiceService);
  readonly notification = inject(ToastrService);
  readonly medService = inject(MedicationService);
  form = inject(FormBuilder).nonNullable.group({
    review: '',
    rating: [0, [Validators.max(5)]],
  });

  readonly routes = inject(Router);
  reviewData = this.routes.getCurrentNavigation()?.extras.state as ReviewType;
  medication_id = input<string>();

  constructor() {
    this.form.patchValue(this.reviewData);
  }
  handleUpdate() {
    const med_id = this.medication_id();
    const newReview = this.form.value as ReviewType;
    const review_id = this.reviewData._id as string;

    this.reviewService.updateReview(med_id!, newReview, review_id).subscribe({
      next: (response) => {
        if (response.success) {
          this.medService.getMedicationById(med_id!).subscribe({
            next: (medResponse) => {
              if (medResponse.success) {
                const updatedResponse = medResponse.data;

                this.medService.$drugState.update((existingDrugs) =>
                  existingDrugs.map((preDrugs) =>
                    preDrugs._id === med_id ? updatedResponse : preDrugs
                  )
                );
                this.notification.success('Update Successful');
              }
            },
            error: (error) => {
              this.notification.error('Fail to update');
            },
          });
        } else {
          this.notification.error('Fail to update');
        }
      },
      error: (error) => {
        this.notification.error('Fail to update');
      },
    });
  }
}
