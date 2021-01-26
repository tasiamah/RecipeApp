import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";


export const SET_RECIPES = '[Recipes] SET RECIPES';
export const ADD_RECIPE = '[Recipes] ADD RECIPE';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';


export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {
  }
}
export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {
  }
}
export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipeActions =
  | SetRecipes
  | AddRecipe;
