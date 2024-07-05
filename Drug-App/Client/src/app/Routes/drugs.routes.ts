import { Routes } from '@angular/router';
import { medications_guard } from '../Guards/guards.components';

export const route_drugs: Routes = [
  {
    path: ':medication_id',
    loadComponent: () =>
      import('../Medications/medication-details.component').then(
        (c) => c.MedicationDetailsComponent
      ),
    // canActivate: [medications_guard],
  },
  {
    path: ':medication_id/update',
    loadComponent: () =>
      import('../Medications/update-medication.component').then(
        (c) => c.UpdateMedicationComponent
      ),
    // canActivate: [medications_guard],
  },

  {
    path: ':medication_id/reviews/add',
    loadComponent: () =>
      import('../reviews/add-review.component').then(
        (c) => c.AddReviewComponent
      ),
  },
  {
    path: ':medication_id/reviews/:review_id/update',
    loadComponent: () =>
      import('../reviews/update-review.component').then(
        (c) => c.UpdateReviewComponent
      ),
  },
];
