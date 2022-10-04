import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../services/recipe.service";
import { Recipe } from "../modules/recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../modules/auth/auth.service";

@Injectable()
export class DataStorageService {

  private url = 'https://recipe-book-f1d5f-default-rtdb.asia-southeast1.firebasedatabase.app/'

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }


  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    this.http
      .put(this.url + 'recipes.json', recipes)
      .subscribe(data => {
        console.log(data);
      })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url + 'recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ?? []
            }
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        })
      )
  }


}