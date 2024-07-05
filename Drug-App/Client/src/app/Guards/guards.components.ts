import { AuthorizationServiceService } from '../Services/authorization-service.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const signedin_guard = () => {
  const routes = inject(Router);
  const authService = inject(AuthorizationServiceService);
  if (authService.is_user_loggedIn()) {
    routes.navigate(['medications']);
    return false;
  } else {
    return true;
  }
};

export const medications_guard = () => {
  const routes = inject(Router);
  const authService = inject(AuthorizationServiceService);

  if (!authService.is_user_loggedIn()) {
    routes.navigate(['']);
    return false;
  } else {
    return true;
  }
};
