import { AuthorizationServiceService } from '../Services/authorization-service.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const jwtTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthorizationServiceService);

  if (authService.is_user_loggedIn()) {
    const reqWithToken = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${authService.$userState().jwt}`
      ),
    });
    return next(reqWithToken);
  } else {
    return next(req);
  }
};
