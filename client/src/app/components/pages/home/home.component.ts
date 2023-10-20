import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  recipes: any[] = [];
  categories: any[] = [];
  defaultCategory: string = 'pork';
  queryParamsSubscription!: Subscription;
newRecipes:any;
user:any;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private helperService:HelperService,
    private toastr:ToastrService
  ) {

    //   this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
    //   // Handle the updated query parameters here
    //   const queryParams = params['c'];
    //   console.log(`param1: ${queryParams}`);
    //   if (queryParams) {
    //   console.log(`queryParams param1: ${queryParams}`);
    //     this.loadMealsByCat(queryParams)
    //     //window.location.reload();
    //   } else {
    //   console.log(`queryParams param2: ${queryParams}`);
    //     this.loadMeals();
    //   }
    // });

    let recipeObservable: Observable<any[]>;

    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      if (queryParams) {
        const category = queryParams.get('c') ?? this.defaultCategory;
        console.log('Category:', category);
        recipeObservable = this.recipeService.getMealBYCategories(category)
        console.log('recipeObservable', recipeObservable)

      } else {
        this.loadMeals();
      }

      recipeObservable.subscribe((serverRes:any)=>{
        this.recipes=serverRes.data.meals;
        console.log('serverRes', serverRes.data.meals)

      })
    })
  }

  ngOnInit(): void {
    this.user=this.helperService.userObj;
    console.log(this.user)

    this.loadCategories();

    // this.activatedRoute.queryParamMap.subscribe((queryParams) => {
    //   if (queryParams) {
    //     const category = queryParams.get('c') ?? this.defaultCategory;
    //     console.log('Category:', category);
    //     this.loadMealsByCat(category)
    //   } else {
    //     this.loadMeals();
    //   }
    // })

    // this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
    //   // Handle the updated query parameters here
    //   const queryParams = params['c'];
    //   console.log(`param1: ${queryParams}`);
    //   if (queryParams) {
    //   console.log(`queryParams param1: ${queryParams}`);
    //     this.loadMealsByCat(queryParams)
    //     this.location.replaceState(`/home?c=${queryParams}`);
    //   } else {
    //   console.log(`queryParams param2: ${queryParams}`);
    //     this.loadMeals();
    //   }
    // });

  }

  async loadCategories() {
    this.recipeService.getAllCategories().subscribe((res) => {
      this.categories.push(res.data.categories);
      console.log('categories::', res.data.categories);
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
    })
    console.log('recipes 3 cat', this.recipes);

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('categories from home ngOnChanges', this.categories)
  }

  addTpFav(mealId:string){
    console.log('useridd',this.user.user.id)
    console.log('add to fav',mealId);
    const userID=this.user.user.id;
    if(userID){
      this.recipeService.addtoFavourites(mealId).subscribe((resData)=>{
        this.toastr.success(
          `Successfully Added to Favourites !`,
          'Adding Successful'
        )
        location.replace("/favourite-meals");
      },error=>{
        console.log(error)
        if (error.statusText == 'Unknown Error') {
          this.toastr.error('Unknown Server Error occured', 'Adding Failed');
        } else {
          this.toastr.error(error.error.message, 'Adding To Favourites failed');

        }
      })
    }else{
      this.toastr.warning('Need To Login For Add to Favourites', 'Adding Failed');
      this.router.navigateByUrl('/user/login')
    }

  }

}
