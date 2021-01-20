import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../ath/auth.service';
import {Subscription} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user))
      .subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipies();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogOut() {
    this.authService.logout();
  }
}
