import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form!: NgForm

  editMode = false

  private editItemIndex!: number
  private editItem!: Ingredient
  private editSubscription!: Subscription

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.editSubscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true
        this.editItemIndex = id
        this.editItem = this.shoppingListService.getIngredient(id)
        this.form.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(form.value.name, form.value.amount)

    this.editMode
      ? this.shoppingListService.update(this.editItemIndex, newIngredient)
      : this.shoppingListService.add(newIngredient)

    this.editMode = false
    this.form.reset()
  }

  onClear() {
    this.editMode = false
    this.form.reset()
  }

  onDelete(){
    this.shoppingListService.delete(this.editItemIndex)
    this.onClear()
  }

  ngOnDestroy(): void {
      this.editSubscription.unsubscribe()
  }


}
