import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../ath/store/auth.actions';

@Component({
  selector: 'app-ath',
  templateUrl: './ath.component.html',
  styleUrls: ['./ath.component.css']
})
export class AthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    let authObs = new Observable<AuthResponseData>();

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    } else {
      authObs = this.authService.singup(email, password);
    }
    // authObs.subscribe(resData => {
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorRes => {
    //     console.log(errorRes);
    //     this.error = errorRes;
    //     this.isLoading = false;
    //   });

    form.reset();
  }

  onCloseError() {
    this.error = null;
  }
}
