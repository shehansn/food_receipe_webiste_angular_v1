import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerRes } from '../shared/models/ServerRes.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(  private http: HttpClient) { }


  // getAll():Observable<ServerRes<Recipe[]>> {
  //   return this.http.get<ServerRes<Recipe[]>>(environment.API_URL);
  // }

  getAllCategories():Observable<ServerRes<any>> {
    return this.http.get<ServerRes<any>>(environment.CATEGORIES_URL);
  }

  getMealBYCategories(c:string):Observable<any> {
    const params = new HttpParams().set('c', c);
    return this.http.get<any>(environment.MEALS_URL,{params});
  }

  // getAllRecipesByTag(tag: any): Observable<Recipe[]> {
  //   return this.http.get<Recipe[]>(environment.API_URL);
  // }

}
