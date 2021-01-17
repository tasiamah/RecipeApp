import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../ath/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipesService: RecipeService,
              private authService: AuthService) { }

  storeRecipies() {
    const recipes = this.recipesService.getRecipes();
    return this.http.put('https://angular-recipe-app-8760b-default-rtdb.firebaseio.com/recipies.json',
      recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://angular-recipe-app-8760b-default-rtdb.firebaseio.com/recipies.json')
      .pipe(
        map(recipeData => {
            return recipeData.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
          }
        ),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }

}
