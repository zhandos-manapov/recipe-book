import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 7)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addItem(eventData: Ingredient){
    this.ingredients.push(eventData);
  }

}
