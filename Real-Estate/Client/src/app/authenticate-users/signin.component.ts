import { Component } from '@angular/core';
import { SignupComponent } from './signup.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SignupComponent],
  template: `
    <p>signin works!</p>
    <app-signup />
  `,
  styles: ``,
})
export class SigninComponent {}
