import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as AuthActions from "../ath/store/auth.actions";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user))
      .subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
