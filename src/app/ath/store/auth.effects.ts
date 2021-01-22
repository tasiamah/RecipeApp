import {Actions, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()


  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIkey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => {
          const expirationData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          return new AuthActions.Login({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate: expirationData
          });
          }),
          catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.LoginFail(errorMessage));
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
            return of(new AuthActions.LoginFail(errorMessage));
          })
        );
    })
  );
  @Effect({dispatch: false})
  authSucccess = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(() => {
    this.router.navigate(['/']);
  }));
  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router) {
  }
}
