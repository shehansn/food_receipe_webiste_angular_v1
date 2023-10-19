import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

interface Recipe {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

@Component({
  selector: 'app-favourite-meals',
  templateUrl: './favourite-meals.component.html',
  styleUrls: ['./favourite-meals.component.css']
})
export class FavouriteMealsComponent implements OnInit {

  recipes: any[] = [];
  categories: any[] = [];
  defaultCategory: string = 'pork';
  categoryNames: any[] = [];
  userId: string = '652a348b8b1648b2f579c757';
  userFav: any[] = [];
  selectedMeals: any[] = [];
user:any;

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private helperService:HelperService
  ) { }

  ngOnInit(): void {
    this.user=this.helperService.userObj;
    console.log(this.user)

    this.loadCategories();

    this.loadFavRecipes();
    console.log('selected meals oninit --------------------------------', this.selectedMeals)

    // this.activatedRoute.queryParamMap.subscribe((queryParams) => {
    //   if (queryParams) {
    //     const category = queryParams.get('c') ?? this.defaultCategory;
    //     console.log('Category:', category);
    //     this.loadMealsByCat(category)
    //   } else {
    //     this.loadMeals();
    //   }
    // })

//alert(this.user)
  }
 async loadFavRecipes() {
    if(this.user){
      this.userId=this.user.user.id;
      alert(this.userId)
      this.userService.getAllFavRecipes(this.userId).subscribe((res) => {
        console.log('user fav-------------------------------', res);
        this.userFav.push(res.data)
        return res.data;
      })

      console.log('user fav-@@@@@@@@@@@@@@@@@@@@@@@@@@--', this.userFav);
    }


  }

  async loadCategories() {
    this.recipeService.getAllCategories().subscribe((res) => {
      this.categories.push(res.data.categories);
      console.log('categories::', res.data.categories);

      for (let cat of this.categories) {
        console.log('strCategory', cat)
        let categorynames = cat.map((category1: { strCategory: any; }) => category1.strCategory);
        this.categoryNames.push(categorynames);
        console.log('categoryNames', categorynames)
        console.log('loadMealsByCat', categorynames[0])
        console.log('loadMealsByCat', categorynames[1])
        console.log('loadMealsByCat', categorynames[2])
        console.log('loadMealsByCat', categorynames[3])

        for (let i = 0; i < categorynames.length; i++) {
          console.log('loadMealsByCat 222', categorynames[i]);
          this.loadMealsByCat(categorynames[i]);
        }
      }
      //console.log('categoryNames outer', this.categoryNames)

    })
    console.log('categories 2', this.categories);
  }

  async loadMeals() {
    this.recipeService.getMealBYCategories(this.defaultCategory).subscribe((res) => {
      for (let i = 0; i < res.data.meals.length; i++) {
        this.recipes.push(res.data.meals[i]);
        console.log(res.data.meals[i]);
      }
      // this.recipes.push(res.data.meals);
      console.log('recipes::', res.data.meals);
    })
    console.log('recipes 2', this.recipes);

  }

  async loadMealsByCat(cat: string) {
    this.recipeService.getMealBYCategories(cat).subscribe((res) => {
      for (let i = 0; i < res.data.meals.length; i++) {
        this.recipes.push(res.data.meals[i]);
        console.log(res.data.meals[i]);
      }
      // this.recipes.push(res.data.categories);
      console.log('recipes', res.data.meals);
      this.loadUserFavouriteRecipes();
    })
    console.log('recipes 3 cat', this.recipes);

  }

  async loadUserFavouriteRecipes() {
    console.log('user fav recipes ids', this.userFav);
    console.log('all recipes', this.recipes);

    for (let recipe of this.recipes) {

      console.log('22222222222222222', recipe.idMeal)
      console.log('33333333333333333', this.userFav[0])

      for (let i = 0; i < this.userFav[0]?.length; i++) {
        const id: string = this.userFav[0][i];
        if (recipe.idMeal == this.userFav[0][i]) {
          console.log(`Value at index 222222222222 ${i}: ${id}`, recipe);
          //const uniqueRecipes = recipe.filter((newRecipe: { idMeal: any; }) => !this.selectedMeals.some((existingRecipe: { idMeal: any; }) => existingRecipe.idMeal === newRecipe.idMeal));
          //console.log('uniqueRecipes',uniqueRecipes)


          this.selectedMeals.push(recipe);
        }
        console.log(`Value at index ${i}: ${id}`);
      }
      // for(let i=0;i<this.userFav.length;){
      //   console.log('333333333333333333333333',this.userFav[i])

      //   // if(recipe.idMeal===this.userFav[i]){
      //   //   console.log('333333333333333333333333',this.userFav[i])
      //   // }
      // }



    }

    // var selectedMeals = this.recipes.filter(meal => this.userFav.includes(meal.idMeal));

    const uniqueRecipes: Recipe[] = Array.from(
      new Set(this.selectedMeals.map((recipe) => recipe.idMeal))
    ).map((idMeal) => {
      return this.selectedMeals.find((recipe) => recipe.idMeal === idMeal);
    });

    console.log('selected meals 111111111111111uniqueRecipes', uniqueRecipes)
    console.log('selected meals 1111111111111111111111111', this.selectedMeals)
    this.selectedMeals = [];
    console.log('selected meals 111111111111111111before', this.selectedMeals)
    for (let i = 0; i < uniqueRecipes.length; i++) {
      this.selectedMeals.push(uniqueRecipes[i]);
      console.log('selected mals 1111111111111 unique',uniqueRecipes[i]);
    }

    //this.selectedMeals.push(uniqueRecipes)
    console.log('selected mals 11111111111111111111after', this.selectedMeals)

  }

}
