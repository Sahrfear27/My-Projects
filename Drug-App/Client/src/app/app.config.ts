import { AuthorizationServiceService } from './Services/authorization-service.service';
import { jwtTokenInterceptor } from './authenticate-users/jwt-token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './Routes/app.routes';
import { provideToastr } from 'ngx-toastr';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
function bootstrap() {
  const authService = inject(AuthorizationServiceService);

  return () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      authService.$userState.set(JSON.parse(userData));
    }
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([jwtTokenInterceptor])),
    provideAnimationsAsync(),
    provideToastr(),
    { provide: APP_INITIALIZER, multi: true, useFactory: bootstrap },
  ],
};
