import { Component } from '@angular/core';
import { PropertyTypesComponent } from './property-types.component';
import { PropertyListingTypeComponent } from './property-listing-type.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [PropertyTypesComponent, PropertyListingTypeComponent],
  template: `
    <p>properties works!</p>
    <app-property-types />
    <app-property-listing-type />
  `,
  styles: ``,
})
export class PropertiesComponent {}
