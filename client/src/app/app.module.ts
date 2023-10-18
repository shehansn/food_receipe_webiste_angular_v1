import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavouriteMealsComponent } from './components/pages/favourite-meals/favourite-meals.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { RecipeComponent } from './components/partials/recipe/recipe.component';
import { CategoryComponent } from './components/partials/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeComponent,
    HomeComponent,
    FavouriteMealsComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-right',
      newestOnTop: false
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
