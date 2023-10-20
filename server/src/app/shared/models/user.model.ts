import { Recipe } from "./recipe.model";

export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public _id: string,
    public id: string,
    public email: string,
    public mobileNumber: string,
    public avatar: string,
    public favoriteRecipes: Recipe[],
  ) { }
}
