import { UserStateType, UserType, initial_state } from '../Types/types';
import { environment } from '../../environments/environment.development';
import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationServiceService {
  readonly http = inject(HttpClient);
  $userState = signal<UserStateType>(initial_state);

  constructor() {
    effect(() => {
      localStorage.setItem('user', JSON.stringify(this.$userState()));
    });
  }
  signup = (user: UserType) => {
    return this.http.post<{ success: boolean; data: UserType }>(
      environment.BACKEND_URL + '/users/signup',
      user
    );
  };

  signin = (userDetails: { email: string; password: string }) => {
    return this.http.post<{ success: boolean; data: string }>(
      environment.BACKEND_URL + '/users/signin',
      userDetails
    );
  };

  is_user_loggedIn() {
    return this.$userState()._id ? true : false;
  }
}
