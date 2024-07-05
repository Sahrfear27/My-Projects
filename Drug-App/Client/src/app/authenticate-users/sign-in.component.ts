import { AuthorizationServiceService } from '../Services/authorization-service.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { UserType } from '../Types/types';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ReactiveFormsModule],
  template: `
    <div [ngClass]="{ container: true }">
      <div [ngClass]="{ formcontainer: true }">
        <h2>Enter Login Details</h2>
        <form [formGroup]="form" (ngSubmit)="handleSignIn()">
          <div [ngClass]="{ formgroup: true }">
            <label>Email</label>
            <input type="email" formControlName="email" placeholder="email" />
          </div>
          <div [ngClass]="{ formgroup: true }">
            <label>Password</label>
            <input
              type="password"
              formControlName="password"
              placeholder="password"
            />
          </div>
          <button [ngClass]="{ addMedicationButton: true }">Login</button>
        </form>
      </div>
    </div>
  `,
  styleUrl: `./users.css`,
})
export class SignInComponent {
  readonly authService = inject(AuthorizationServiceService);
  readonly notfication = inject(ToastrService);
  readonly routes = inject(Router);
  form = inject(FormBuilder).nonNullable.group({
    email: ['sahr@gmail.com', [Validators.required, Validators.email]],
    password: ['Macarthy', [Validators.required]],
  });

  handleSignIn() {
    const userDetails = this.form.value as UserType;
    this.authService.signin(userDetails).subscribe({
      next: (reponse) => {
        if (reponse.success) {
          const decodedUserInformation: UserType = jwtDecode(reponse.data);
          this.authService.$userState.set({
            _id: decodedUserInformation._id,
            fullname: decodedUserInformation.fullname,
            email: decodedUserInformation.email,
            jwt: reponse.data,
          });
          this.notfication.success('SignIn Successful');
          this.routes.navigate(['']);
        }
      },
      error: (error) => {
        this.notfication.error('Invalid Email or Password');
      },
    });
  }
}
