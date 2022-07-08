import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { asyncScheduler } from 'rxjs';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipe!: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

  setRecipeDetails(eventData: Recipe){
    this.recipe = eventData;
  }

}
