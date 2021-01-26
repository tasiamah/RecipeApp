import {Actions, Effect, ofType} from "@ngrx/effects";
import * as RecipeActions from '../store/recipe.actions';
import {map, switchMap} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

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

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }
}
