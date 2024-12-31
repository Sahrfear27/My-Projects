import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ServicesOfferedComponent } from '../services-offered/services-offered.component';
import { PropertiesComponent } from '../properties/properties.component';
import { ContactComponent } from '../contact/contact.component';
import { SigninComponent } from '../authenticate-users/signin.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    ServicesOfferedComponent,
    PropertiesComponent,
    ContactComponent,
    SigninComponent,
  ],
  template: `
    <p>home works!</p>
    <app-about />
    <app-services-offered />
    <app-properties />
    <app-contact />
    <app-signin />
  `,
  styles: ``,
})
export class HomeComponent {}
