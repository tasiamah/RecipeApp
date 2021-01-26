import {Action} from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE SUCCESS';
export const LOGOUT = '[Auth] LOGOUT';
export const LOGIN_START = '[Auth] LOGIN START';
export const AUTO_LOGIN = '[Auth] AUTO LOGIN';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE FAIL';
export const SIGNUP_START = '[Auth] SIGNUP START';
export const CLEAR_ERROR = '[Auth] CLEAR ERROR';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date, redirect: boolean}) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: {email: string, password: string}) {
  }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {
  }
}
export class SignUpStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: {email: string, password: string}) {
  }
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | LoginStart
  | AuthenticateFail
  | AuthenticateSuccess
  | Logout
  | SignUpStart
  | ClearError
  | AutoLogin;
