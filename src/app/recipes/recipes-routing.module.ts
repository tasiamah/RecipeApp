import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../ath/auth.guard';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeResolverService} from './recipe-resolver.service';
import {CommonModule} from '@angular/common';



const routes: Routes = [
  {path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent , resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent , resolve: [RecipeResolverService]},
    ]},
];
// @ts-ignore
@NgModule({
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes)]
})


export class RecipesRoutingModule { }
