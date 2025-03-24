import { AuthorizationServiceService } from './Services/authorization-service.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: ``,
})
export class AppComponent {
  readonly authenService = inject(AuthorizationServiceService);
}
