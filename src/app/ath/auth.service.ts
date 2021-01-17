import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

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
  user = new BehaviorSubject<User>(null);

  constructor(private  http: HttpClient,
              private router: Router) { }

  singup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqVUpGV4sIOTnlC1b4GTyQlvB3BR6AZSM',
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
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqVUpGV4sIOTnlC1b4GTyQlvB3BR6AZSM',
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
      this.user.next(loadUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, userId: string, idToken: string, expiresIn: number) {
    const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      idToken,
      expirationData
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handeError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error occured!';
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
