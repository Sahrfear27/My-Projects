import { AuthorizationServiceService } from '../Services/authorization-service.service';
import { MatIconModule } from '@angular/material/icon';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { UserType } from '../Types/types';
import { ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgClass, MatIconModule, ReactiveFormsModule],
  template: `
    <div [ngClass]="{ container: true }">
      <div [ngClass]="{ formcontainer: true }">
        <h2>Enter Signup Details</h2>
        <div>
          <mat-icon
            aria-hidden="false"
            aria-label="Example home lock"
            fontIcon="lock"
          ></mat-icon>
        </div>
        <form [formGroup]="form" (ngSubmit)="handleSignUp()">
          <div [ngClass]="{ formgroup: true }">
            <label>Fullname</label>
            <input type="text" formControlName="fullname" />
          </div>
          <div [ngClass]="{ formgroup: true }">
            <label>Email</label>
            <input type="email" formControlName="email" />
          </div>
          @if (email.invalid && (email.touched || email.dirty)) {
          <div>
            @if(email.hasError('required')){
            <span>Email Is Required</span>
            }@if(email.hasError('email')){
            <span>Email is not Valid</span>
            }
          </div>
          }
          <div [ngClass]="{ formgroup: true }">
            <label>Password</label>
            <input type="password" formControlName="password" />
          </div>
          <div [ngClass]="{ formgroup: true }">
            <label>Confrim</label>
            <input type="password" formControlName="confirm_password" />
          </div>
          @if (password.hasError('TooShort') && password.touched) {
          <p>
            <span>Too Short</span>
          </p>
          } @else if(password.hasError('InvalidType') && password.touched){
          <span>Invalid Type</span>
          <br />
          } @else if (form.hasError('mismatch') && (password.touched ||
          confirm_password.dirty)) {
          <div>
            <span>Password do not match</span>
          </div>

          }
          <button
            [disabled]="form.invalid"
            [ngClass]="{ addMedicationButton: true }"
          >
            SignUP
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrl: `./users.css`,
})
export class SignUpComponent {
  readonly notification = inject(ToastrService);
  readonly routes = inject(Router);
  readonly authServices = inject(AuthorizationServiceService);
  form = inject(FormBuilder).nonNullable.group(
    {
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(4), this.validatePassword],
      ],
      confirm_password: ['', [Validators.required]],
    },
    { validators: this.match_Password }
  );
  get fullname() {
    return this.form.controls.fullname;
  }
  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirm_password() {
    return this.form.controls.confirm_password;
  }
  validatePassword(control: AbstractControl) {
    const password: string = control.value;
    if (password.length < 6) {
      return { TooShort: true };
    } else if (password === '1234') {
      return { InvalidType: true };
    } else {
      return null;
    }
  }
  match_Password(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm_password = control.get('confirm_password')?.value;
    if (password === confirm_password) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
  handleSignUp() {
    this.authServices.signup(this.form.value as UserType).subscribe({
      next: (response) => {
        if (response.success) {
          this.notification.success('Sign Up Successful');
          this.routes.navigate(['']);
        }
      },
      error: (error) => {
        this.notification.error('Sign Up Fail');
      },
    });
  }
}
