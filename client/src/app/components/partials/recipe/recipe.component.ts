import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input()
  recipe!:Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
