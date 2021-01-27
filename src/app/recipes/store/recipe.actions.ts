import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPES = '[Recipes] SET RECIPES';
export const ADD_RECIPE = '[Recipes] ADD RECIPE';
export const STORE_RECIPES = '[Recipes] STORE Recipes';
export const UPDATE_RECIPE = '[Recipes] UPDATE RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE RECIPE';
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
export class UpdateRecipes implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: {index: number, newRecipe: Recipe}) {
  }
}
export class DeleteRecipes implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {
  }
}
export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipeActions =
  | SetRecipes
  | AddRecipe
  | UpdateRecipes
  | FetchRecipes
  | DeleteRecipes
  | StoreRecipes;
