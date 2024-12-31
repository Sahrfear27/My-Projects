import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <app-home />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Client';
}
