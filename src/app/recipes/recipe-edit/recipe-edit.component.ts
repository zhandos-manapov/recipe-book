import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {

  recipeForm!: FormGroup
  recipeId!: number
  editMode: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id']
        this.editMode = params['id'] != null
        this.initForm()
      }
    )
  }

  private initForm() {
    let
      recipeName = '',
      recipeImagePath = '',
      recipeDescription = '',
      recipeIngredients: FormGroup[] = []

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeId)

      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.min(0)
              ])
            })
          )
        }
      }
    }

    const recipeForm = {
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: new FormArray(recipeIngredients)
    }

    this.recipeForm = new FormGroup(recipeForm)
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required)
      })
    )
  }

  onDeleteIngredient(id: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id)
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    )

    this.editMode
      ? this.recipeService.update(this.recipeId, recipe)
      : this.recipeService.add(recipe)

    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
