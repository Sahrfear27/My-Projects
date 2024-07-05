import { AuthorizationServiceService } from './authorization-service.service';
import { environment } from '../../environments/environment.development';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ReviewType, initial_review } from '../Types/types';
import { MedicationService } from './medication.service';

import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ReviewServiceService {
  readonly notification = inject(ToastrService);
  readonly medService = inject(MedicationService);
  readonly authService = inject(AuthorizationServiceService);
  readonly http = inject(HttpClient);
  $reviewState = signal<ReviewType>(initial_review);

  $computed_review = computed(() => {
    return this.$reviewState();
  });

  addReview(medication_id: string, newReview: ReviewType) {
    return this.http.post<{ success: boolean; data: string }>(
      environment.BACKEND_URL + `/medications/${medication_id}/reviews`,
      newReview
    );
  }

  updateReview(
    medication_id: string,
    newReview: ReviewType,
    review_id: string
  ) {
    return this.http.put<{ success: boolean; data: boolean }>(
      environment.BACKEND_URL +
        '/medications/' +
        medication_id +
        '/reviews/' +
        review_id,
      newReview
    );
  }
  deleteReview(medication_id: string, review_id: string) {
    return this.http.delete<{ success: boolean; data: boolean }>(
      environment.BACKEND_URL +
        '/medications/' +
        medication_id +
        '/reviews/' +
        review_id
    );
  }
}
