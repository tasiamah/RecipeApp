import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]){
        this.name = name;
        this.imagePath = imagePath;
        this.description = desc;
        this.ingredients = ingredients;
    }
}
