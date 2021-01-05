import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  recipes: Recipe[] = [
    new Recipe('Test Recipe','Description for test recipe',
    'https://www.davidlebovitz.com/wp-content/uploads/2005/11/Persimmon-bread-pudding-recipe-james-beard_-4-640x889.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
