import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeSerivce: RecipeService) { }

  ngOnInit(): void {
    this.subscription = this.recipeSerivce.recipesChanged
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeSerivce.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
