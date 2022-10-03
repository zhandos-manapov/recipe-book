import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private recipeService: RecipeService,
    private fb: FormBuilder
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
      recipeIngredients = []

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeId)

      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.fb.group({
              name: [ingredient.name, [Validators.required]],
              amount: [ingredient.amount, [Validators.required, Validators.min(0)]]
            })
          )
        }
      }
    }

    const recipeForm = {
      name: [recipeName, [Validators.required]],
      imagePath: [recipeImagePath, [Validators.required]],
      description: [recipeDescription, [Validators.required]],
      ingredients: this.fb.array(recipeIngredients)
    }

    this.recipeForm = this.fb.group(recipeForm)
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.fb.group({
        name: ['', Validators.required],
        amount: ['', Validators.required]
      })
    )
  }

  onDeleteIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id)
  }

  onSubmit() {
    const recipe = <Recipe>{ ...this.recipeForm.value }

    this.editMode
      ? this.recipeService.update(this.recipeId, recipe)
      : this.recipeService.add(recipe)

    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
