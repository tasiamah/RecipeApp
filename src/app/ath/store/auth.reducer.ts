import {User} from "../user.model";
import * as AuthActions from "./auth.actions";
import {AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, LOGIN_START} from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(
  state= initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate);
      return {
        ...state,
        user: user,
        authError: null
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        AuthError: null,
        loading: true
      };
      case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}