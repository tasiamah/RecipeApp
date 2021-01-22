import {Action} from "@ngrx/store";

export const LOGIN = '[Auth] LOGIN';
export const LOGIN_START = '[Auth] LOGIN START';
export const LOGIN_FAIL = '[Auth] LOGIN FAIL';
export const LOGOUT = '[Auth] LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date}) {
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

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {
  }
}

export type AuthActions =
  | LoginStart
  | LoginFail
  | Login
  | Logout;
