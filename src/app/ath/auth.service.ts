import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../ath/store/auth.actions';
import {authReducer} from "./store/auth.reducer";

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
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private  http: HttpClient,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  singup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true,

      }
      ).pipe(catchError(this.handeError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handeError), tap(resData => {
      this.handleAuthentication(
        resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return ;
    }
    const loadUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadUser.token) {
      this.store.dispatch(new AuthActions.Login(
        {email: loadUser.email, userId: loadUser.id, token: loadUser.token, expirationDate: new Date(userData._tokenExpirationDate)}));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData')
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

  private handleAuthentication(email: string, userId: string, idToken: string, expiresIn: number) {
    const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      idToken,
      expirationData
    );
    this.store.dispatch(new AuthActions.Login({
      email: email,
      userId: userId,
      token: idToken,
      expirationDate: expirationData
    }));
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handeError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
        case 'EMAIL_NOT_FOUND:':
        errorMessage = 'This was not found';
        break;
        case 'INVALID_PASSWORD':
        errorMessage = 'This password is invalid';
        break;
    }
    return throwError(errorMessage);
  }
}
