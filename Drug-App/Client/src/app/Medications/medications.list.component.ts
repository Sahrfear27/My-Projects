import { AuthorizationServiceService } from '../Services/authorization-service.service';
import { MedicationService } from '../Services/medication.service';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { initial_state } from '../Types/types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-drugs-information',
  standalone: true,
  imports: [MatButtonModule, NgClass, RouterLink, MatIconModule],
  template: `
    <div>
      @if(authService.is_user_loggedIn()){
      <nav [ngClass]="{ navbar: true }">
        <ul>
          <li (click)="handleLogOut()" [ngClass]="{ navLink: true }">LogOut</li>
          <li (click)="handleAdd()" [ngClass]="{ navLink: true }">
            Add Medication
          </li>
        </ul>
      </nav>
      <h1>Welcome {{ authService.$userState().fullname }}</h1>
      <h4>Drugs & Medications A to Z</h4>

      <div [ngClass]="{ buttonContainer: true }">
        @for (char of $chars(); track char ) {
        <button
          mat-raised-button
          [ngClass]="{ letterButton: true }"
          (click)="displayByFirstLetter(char)"
        >
          {{ char }}
        </button>
        }
      </div>
      <div
        [ngClass]="{
          medNameCard: true,
          displayLetterAsGrid: $medService.$computed_drug_state().length >= 5
        }"
      >
        @for (meds of $medService.$computed_drug_state(); track meds._id; let
        count = $count) {
        <p [ngClass]="{ modifyCard: true }">
          <a [routerLink]="['medications', meds._id]">{{ meds.name }}</a>
        </p>
        }
      </div>
      }@else {
      <nav [ngClass]="{ navbar: true }">
        <ul>
          <li [ngClass]="{ navLink: true }" (click)="goToSignUp()">Register</li>
          <li [ngClass]="{ navLink: true }" (click)="goToSignIn()">SignIn</li>
        </ul>
      </nav>

      <h1>Drugs & Medications A to Z</h1>
      <div [ngClass]="{ introCard: true }">
        <div [ngClass]="{ subCard: true }">
          <p>
            Explore comprehensive and precise information on over 24,000
            prescription and over-the-counter medications. Our database is
            designed to cater to the needs of both consumers and healthcare
            professionals.
          </p>
          <p>
            Gain insights into drug interactions, side effects, and usage
            guidelines. Stay informed about the latest updates in the
            pharmaceutical world.
          </p>
        </div>

        <div [ngClass]="{ bgCard: true }">
          <img width="300px" src="../../bg.jpg" alt="bird" />
        </div>
      </div>

      <div [ngClass]="{ buttonContainer: true }">
        @for (char of $chars(); track char) {
        <button
          mat-raised-button
          [ngClass]="{ letterButton: true }"
          (click)="displayByFirstLetter(char)"
        >
          {{ char }}
        </button>
        }
      </div>
      <div
        [ngClass]="{
          medNameCard: true,
          displayLetterAsGrid: $medService.$computed_drug_state().length >= 5
        }"
      >
        @for (meds of $medService.$computed_drug_state(); track meds._id) {
        <p [ngClass]="{ modifyCard: true }">
          <a [routerLink]="['medications', meds._id]">{{ meds.name }}</a>
        </p>

        }
      </div>
      }
    </div>
  `,
  styleUrl: `./medication.css`,
})
export class DrugsInformationComponent {
  routes = inject(Router);
  $chars = signal<string[]>([]);
  $medService = inject(MedicationService);
  authService = inject(AuthorizationServiceService);
  ngOnInit() {
    const letters = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );
    this.$chars.set(letters);
    this.displayByFirstLetter('A');
  }

  goToSignUp() {
    this.routes.navigate(['signup']);
  }
  goToSignIn() {
    this.routes.navigate(['signin']);
  }
  handleAdd() {
    this.routes.navigate(['add']);
  }

  handleLogOut() {
    this.authService.$userState.set(initial_state);
    this.routes.navigate(['']);
  }

  displayByFirstLetter(first_letter: string) {
    this.$medService
      .getMedicationByFirstLetter(first_letter)
      .subscribe((response) => {
        if (response.success) {
          this.$medService.$drugState.set(response.data);
        }
      });
  }
}
