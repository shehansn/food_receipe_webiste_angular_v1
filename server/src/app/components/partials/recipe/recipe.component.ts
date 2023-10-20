import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipe: any;
  idMeal!: string;

  constructor(private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.recipe=new Recipe()
    this.activatedRoute.params.subscribe(params => {
      this.idMeal = params['idMeal'];
      console.log('idMeal ID:', this.idMeal);
      this.recipeService.getMealById(this.idMeal).subscribe((resData) => {
        this.recipe = resData.data
        console.log("resData.data",resData.data)
        console.log('recipe',this.recipe.meals[0])
        this.recipe = this.recipe.meals[0];

      }, err => {
        this.toastrService.error(err.error.message, 'Failed to get Meal');

      })

    });

  }

  back() {
    this.router.navigateByUrl('/home');
  }

}
