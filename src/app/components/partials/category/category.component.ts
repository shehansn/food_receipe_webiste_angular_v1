import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { ICategory } from 'src/app/shared/interfaces/ICategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: ICategory[] = [];

  constructor(private recipeService: RecipeService,
    private router :Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    this.recipeService.getAllCategories().subscribe((res) => {
      for (let i = 0; i < res.data.categories.length; i++) {
        this.categories.push(res.data.categories[i]);
        console.log(res.data.categories[i]);
      }
      console.log('categories:: cat page', res.data.categories);
    })
    console.log('categories 2 cat page', this.categories);

  }

  changeQueryParams(tag:string) {
    const queryParams: NavigationExtras = {
      queryParams: { c: tag }
    };

    // Navigate to the current route with updated query parameters
    this.router.navigate([], queryParams);
  }

}
