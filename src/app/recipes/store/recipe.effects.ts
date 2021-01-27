import {Actions, Effect, ofType} from "@ngrx/effects";
import * as RecipeActions from '../store/recipe.actions';
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://angular-recipe-app-8760b-default-rtdb.firebaseio.com/recipies.json');
    }),
    map(recipeData => {
        return recipeData.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }
    ),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
    );

  @Effect()
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put('https://angular-recipe-app-8760b-default-rtdb.firebaseio.com/recipies.json',
        recipesState.recipes);
    }));
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }
}
