import { DrugsInformationComponent } from '../Medications/medications.list.component';
import { SignInComponent } from '../authenticate-users/sign-in.component';
import { SignUpComponent } from '../authenticate-users/sign-up.component';
import { medications_guard } from '../Guards/guards.components';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: DrugsInformationComponent,
    pathMatch: 'full',
    title: 'Medications',
  },
  {
    path: 'signin',
    component: SignInComponent,
  },
  { path: 'signup', component: SignUpComponent },

  {
    path: 'drugs',
    loadComponent: () =>
      import('../Medications/medications.list.component').then(
        (c) => c.DrugsInformationComponent
      ),
  },
  {
    path: 'medications',
    loadChildren: () => import('./drugs.routes').then((r) => r.route_drugs),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../Medications/add-medication.component').then(
        (c) => c.AddMedicationComponent
      ),
    canActivate: [medications_guard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
