import { Subject } from 'rxjs';
import { Recipe } from '../modules/recipes/recipe.model';

export class RecipeService {

  recipeChanged = new Subject<Recipe[]>()

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Pancake',
  //     'Description 1',
  //     'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F20%2F20334-Banana-Pancakes-mfs__2x3.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French fries', 20)
  //     ]),
  //   new Recipe(
  //     'Icecream',
  //     'Description 2',
  //     'https://www.biggerbolderbaking.com/wp-content/uploads/2020/01/2-Ingredient-Ice-cream-Thumbnail-scaled.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Banana', 4),
  //     ])
  // ];

  private recipes: Recipe[] = []

  constructor() { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice()
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id]
  }

  add(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }

  update(id: number, recipe: Recipe){
    this.recipes[id] = recipe
    this.recipeChanged.next(this.recipes.slice())
  }

  delete(id: number){
    this.recipes.splice(id, 1)
    this.recipeChanged.next(this.recipes.slice())
  }

}
