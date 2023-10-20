import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerRes } from '../shared/models/ServerRes.model';

import { environment } from '../../environments/environment';
import { Recipe } from '../shared/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }


  getAllCategories(): Observable<ServerRes<any>> {
    return this.http.get<ServerRes<any>>(environment.CATEGORIES_URL);
  }

  getMealById(id: string): Observable<ServerRes<Recipe>> {
    return this.http.get<ServerRes<Recipe>>(environment.GET_RECIPY_BY_ID_URL + id, {});
  }

  getMealBYCategories(c: string): Observable<any> {
    const params = new HttpParams().set('c', c);
    return this.http.get<any>(environment.MEALS_URL, { params });
  }

  addtoFavourites(recipeId: string): Observable<any> {
    const params = new HttpParams().set('recipeId', recipeId);
    return this.http.post<any>(environment.ADD_FAV_RECIPES_URL, {}, { params });
  }

  removeFromFavourites(recipeId: string): Observable<any> {
    const params = new HttpParams().set('recipeId', recipeId);
    return this.http.post<any>(environment.REMOVE_FAV_RECIPES_URL, {}, { params });
  }


}
