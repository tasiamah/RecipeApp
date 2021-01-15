import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Test Recipe', 'Description for test recipe',
      'https://www.davidlebovitz.com/wp-content/uploads/2005/11/Persimmon-bread-pudding-recipe-james-beard_-4-640x889.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 1)
      ]
      )
  ];
  constructor(private shoppingListService: ShoppingListService) { }
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}

