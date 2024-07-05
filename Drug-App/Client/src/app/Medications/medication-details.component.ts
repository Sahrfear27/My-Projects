import { AuthorizationServiceService } from '../Services/authorization-service.service';
import { ReviewServiceService } from '../Services/review-service.service';
import { MedicationService } from '../Services/medication.service';
import { DatePipe, LowerCasePipe, NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MedicationType } from '../Types/types';
import { ToastrService } from 'ngx-toastr';
import {
  Component,
  ElementRef,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-medication-details',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    MatTooltipModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
    LowerCasePipe,
  ],
  template: `
    <div [ngClass]="{ container: true }">
      <div [ngClass]="{ header: true }">
        <div [ngClass]="{ headerDetails: true }">
          <h4>Drug Details</h4>
          <p>
            Name:
            <span> {{ $drugItem().name }}</span>
          </p>
          <p>
            Created By: <span>{{ $drugItem().added_by.fullname }}</span>
          </p>
          <p>
            Generic Name: <span>{{ $drugItem().generic_name }}</span>
          </p>
          <p>
            Medication Class: <span>{{ $drugItem().medication_class }}</span>
          </p>
          <div [ngClass]="{ detailActions: true }">
            @if(authService.is_user_loggedIn() && ($drugItem().added_by.user_id
            === authService.$userState()._id)){
            <p>
              <button
                mat-raised-button
                color="accent"
                [routerLink]="['', 'medications', $drugItem()._id, 'update']"
                [state]="$drugItem()"
              >
                Edit
              </button>
            </p>
            <p>
              <button
                mat-raised-button
                color="warn"
                (click)="handleDeleteMedication($drugItem()._id)"
              >
                Delete
              </button>
            </p>
            }
          </div>
        </div>
        <div [ngClass]="{ imageContainer: true }">
          <h3>Images</h3>
          <img
            [ngClass]="{ imageContainer: true }"
            src="http://localhost:3000/medications/images/{{
              $drugItem().image!._id
            }}"
          />
        </div>
      </div>
      <h2 [ngClass]="{ reviewTitle: true }">Reviews</h2>
      <div [ngClass]="{ reviewsGrid: true }">
        @for (review of $drugItem().reviews; track review._id) {
        <div [ngClass]="{ reviewCard: true }">
          <div>
            <div [ngClass]="{ reviewDetails: true }">
              <p>
                By:
                <span>{{ review.by?.fullname }}</span>
              </p>
              <p>
                Review:
                <span> {{ review.review | lowercase }}</span>
              </p>
              <p>
                Date:
                <span>{{ review.date | date : 'MM/dd/yy' }}</span>
              </p>
            </div>

            <p>
              @for(stars of generateStars(review.rating); track $index){

              <mat-icon
                aria-hidden="false"
                fontIcon="star"
                [ngClass]="{ changeStarToYellow: true }"
              ></mat-icon>

              }
            </p>
          </div>
          <div>
            @if(authService.is_user_loggedIn() && (authService.$userState()._id
            === review.by?.user_id)){
            <div [ngClass]="{ reviewActions: true }">
              <button
                mat-raised-button
                color="accent"
                [routerLink]="[
                  '',
                  'medications',
                  $drugItem()._id,
                  'reviews',
                  review._id,
                  'update'
                ]"
                [state]="review"
              >
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="handleDeleteReview(review._id!)"
              >
                Delete
              </button>
            </div>
            }
          </div>
        </div>
        }
      </div>
      @if(authService.is_user_loggedIn()){
      <button
        [ngClass]="{ addReviewButton: true }"
        [routerLink]="['', 'medications', $drugItem()._id, 'reviews', 'add']"
        [state]="$drugItem()"
        #buttonAction
      >
        Add Reviews
      </button>
      }
    </div>
  `,
  styleUrl: `./med.css`,
})
export class MedicationDetailsComponent {
  readonly notification = inject(ToastrService);
  readonly authService = inject(AuthorizationServiceService);
  readonly medService = inject(MedicationService);
  readonly reviewService = inject(ReviewServiceService);
  $drugItem = signal<MedicationType>({
    _id: '', //just added
    name: '',
    first_letter: '',
    generic_name: '',
    medication_class: '',
    availability: '',
    image: { _id: '' },
    added_by: { email: '', fullname: '', user_id: '' },
    reviews: [
      {
        _id: '',
        review: '',
        rating: 0,

        by: { user_id: '', fullname: '' },
        date: '',
      },
    ],
  });
  $starsRating = signal<number>(0);
  routes = inject(Router);
  medication_id = input<string>();
  $conditions = signal<boolean>(true);

  $refToDiv = viewChild<ElementRef<HTMLDivElement>>('actions');
  $refToDivReview = viewChild<ElementRef<HTMLDivElement>>('reviewAction');
  $refToButton = viewChild<ElementRef<HTMLButtonElement>>('buttonAction');
  loggedIn_userId = this.authService.$userState()._id;

  constructor() {
    effect(() => {
      this.medService
        .getMedicationById(this.medication_id()!)
        .subscribe((response) => {
          this.$drugItem.set(response.data);
        });
    });
  }
  handleDeleteMedication(id: string) {
    this.medService.deleteMedicationById(id).subscribe((response) => {
      if (response.success) {
        this.medService.$drugState().filter((preDrugs) => preDrugs._id !== id);
        this.notification.success('Delete Successful');
        this.routes.navigate(['']);
      } else {
        this.notification.error('Fail to delete');
      }
    });
  }

  handleAddReview() {
    this.routes.navigate(['medications/:medication_i/reviews']);
  }

  generateStars(rating: number): number[] {
    return Array.from({ length: rating });
  }

  handleDeleteReview(review_id: string) {
    const med_id = this.medication_id();
    this.reviewService.deleteReview(med_id!, review_id).subscribe({
      next: (reviewResponse) => {
        if (reviewResponse.success) {
          this.$drugItem.update((currentDrugs) => {
            const updatedReviews = currentDrugs.reviews?.filter(
              (reviews) => reviews._id !== review_id
            );
            return { ...currentDrugs, reviews: updatedReviews };
          });
          this.notification.success('Deleted');
        } else {
          this.notification.error('Fail to Delete');
        }
      },
      error: (error) => {
        this.notification.error('Fail to Delete');
      },
    });
  }
}
