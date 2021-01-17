import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean| UrlTree> | Promise<boolean | UrlTree> | boolean {
    return this.authService.user.pipe(map(user => {
      const isAth = !!user;
      if (isAth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
  }
}
