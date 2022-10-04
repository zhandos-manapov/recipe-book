import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()

  constructor() { }

  ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 7)
  ];

  get() {
    return this.ingredients.slice()
  }

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  add(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  update(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  delete(index: number) {
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

}
