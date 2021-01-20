import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean| UrlTree> | Promise<boolean | UrlTree> | boolean {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(user => {
      const isAth = !!user;
      if (isAth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
  }
}
