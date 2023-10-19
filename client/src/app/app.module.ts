import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavouriteMealsComponent } from './components/pages/favourite-meals/favourite-meals.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoadingCoverComponent } from './components/partials/Loader/loading-cover/loading-cover.component';
import { LoadingSvgComponent } from './components/partials/Loader/loading-svg/loading-svg.component';
import { CategoryComponent } from './components/partials/category/category.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { RecipeComponent } from './components/partials/recipe/recipe.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeComponent,
    HomeComponent,
    FavouriteMealsComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    LoadingSvgComponent,
    LoadingCoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-right',
      newestOnTop: false
    }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
