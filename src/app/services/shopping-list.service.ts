import { Ingredient } from "../shared/ingredient.model";
export class ShoppingListService {

  constructor() { }

  ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 7)
  ];

  add(eventData: Ingredient){
    this.ingredients.push(eventData);
  }
}
