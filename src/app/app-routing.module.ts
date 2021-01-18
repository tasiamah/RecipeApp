import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AthComponent} from './ath/ath.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'auth', component: AthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
