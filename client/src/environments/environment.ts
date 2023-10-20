// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const API_URL="http://localhost:9000/api/v1/recipe";
// const CATEGORIES_URL="http://localhost:9000/api/v1/recipe/categories";
// const MEALS_URL="http://localhost:9000/api/v1/recipe/meals";
const API_SERVER_URL="http://localhost:9000";

export const environment = {
  production: false,
  API_URL:`http://localhost:9000/api/v1/recipe`,
  CATEGORIES_URL:`http://localhost:9000/api/v1/recipe/categories`,
  MEALS_URL:`http://localhost:9000/api/v1/recipe/meals`,
  FAV_RECIPES_URL:`http://localhost:9000/api/v1/recipe/favoriteRecipes`,
  ADD_FAV_RECIPES_URL:`http://localhost:9000/api/v1/recipe/addToFavorites`,
  REMOVE_FAV_RECIPES_URL:`http://localhost:9000/api/v1/recipe/removeFromFavorites`,
  GET_RECIPY_BY_ID_URL:`http://localhost:9000/api/v1/recipe/meals/`,
  USER_API_URL : `http://localhost:9000/api/v1/user`

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
