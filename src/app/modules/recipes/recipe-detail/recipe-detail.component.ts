import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id!: number
  recipe!: Recipe

  constructor(
    private shoppingListService: ShoppingListService, 
    private route: ActivatedRoute, 
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }

  toShoppingList() {
    this.shoppingListService.addList(this.recipe.ingredients)
  }

  onDeleteRecipe(){
    this.recipeService.delete(this.id)
    this.router.navigate(['/recipes'])
  }

}
