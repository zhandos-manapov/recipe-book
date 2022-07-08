import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeListEvent = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Pancake', 'Description 1', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F20%2F20334-Banana-Pancakes-mfs__2x3.jpg'),
    new Recipe('Icecream', 'Description 2', 'https://www.biggerbolderbaking.com/wp-content/uploads/2020/01/2-Ingredient-Ice-cream-Thumbnail-scaled.jpg')
  ];
  recipeItem!: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  setItem(eventData: Recipe){ 
    this.recipeListEvent.emit(eventData);
  }

}
