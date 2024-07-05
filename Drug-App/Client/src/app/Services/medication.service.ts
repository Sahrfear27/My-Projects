import { AuthorizationServiceService } from './authorization-service.service';
import { environment } from '../../environments/environment.development';
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicationType } from '../Types/types';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  readonly http = inject(HttpClient);
  readonly authService = inject(AuthorizationServiceService);
  readonly notification = inject(ToastrService);
  $drugState = signal<MedicationType[]>([]);

  $computed_drug_state = computed(() => {
    return this.$drugState();
  });
  addMedication(medicationData: FormData) {
    return this.http.post<{ success: boolean; data: MedicationType }>(
      environment.BACKEND_URL + '/medications',
      medicationData
    );
  }
  checkMedicationByName(name: string) {
    return this.http.get<{ exist: boolean }>(
      `${environment.BACKEND_URL}/medications/verify?name=${name}`
    );
  }

  getMedicationByFirstLetter(first_letter: string) {
    return this.http.get<{ success: boolean; data: MedicationType[] }>(
      environment.BACKEND_URL + `/medications?first_letter=${first_letter}`
    );
  }

  getMedicationById(id: string) {
    return this.http.get<{ success: boolean; data: MedicationType }>(
      environment.BACKEND_URL + `/medications/${id}`
    );
  }

  getMedicationPictureById(id: string) {
    return this.http.get<unknown>(
      environment.BACKEND_URL + '/medications/images/' + id
    );
  }
  updateMedicationById(medication_id: string, updatedMed: FormData) {
    return this.http
      .put<{ success: boolean; data: MedicationType }>(
        environment.BACKEND_URL + `/medications/${medication_id}`,
        updatedMed
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.$drugState.update((stateResponse) =>
              stateResponse.map((existingStateDrugs) =>
                existingStateDrugs._id === response.data._id
                  ? response.data
                  : existingStateDrugs
              )
            );
            this.notification.success('Update Successful');
          } else {
            this.notification.error('Fail to update');
          }
        },
        error: (error) => {
          this.notification.error('Fail to Update');
        },
      });
  }

  deleteMedicationById(medication_id: string) {
    return this.http.delete<{ success: boolean; data: boolean }>(
      environment.BACKEND_URL + `/medications/${medication_id}`
    );
  }
}
