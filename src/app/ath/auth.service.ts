import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../ath/store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private  http: HttpClient,
              private router: Router,
              private store: Store<fromApp.AppState>) { }


  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return {type: 'DUMMY'};
    }
    const loadUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadUser.token) {
      this.store.dispatch(new AuthActions.AuthenticateSuccess(
        {email: loadUser.email, userId: loadUser.id, token: loadUser.token, expirationDate: new Date(userData._tokenExpirationDate)}));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
    return {type: 'DUMMY'};
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(experationDuration: number) {
    this. tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, experationDuration);
  }
}
