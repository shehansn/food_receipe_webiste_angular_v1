const API_SERVER_URL="http://localhost:9000";

export const environment = {
  production: true,
  API_URL:`http://localhost:9000/api/v1/recipe`,
  CATEGORIES_URL:`http://localhost:9000/api/v1/recipe/categories`,
  MEALS_URL:`http://localhost:9000/api/v1/recipe/meals`,
  FAV_RECIPES_URL:`http://localhost:9000/api/v1/recipe/favoriteRecipes`,
  ADD_FAV_RECIPES_URL:`http://localhost:9000/api/v1/recipe/addToFavorites`,
  REMOVE_FAV_RECIPES_URL:`http://localhost:9000/api/v1/recipe/removeFromFavorites`,
  GET_RECIPY_BY_ID_URL:`http://localhost:9000/api/v1/recipe/meals/`,
  USER_API_URL : `http://localhost:9000/api/v1/user`

  // API_URL:`${{API_SERVER_URL}}/api/v1/recipe`,
  // CATEGORIES_URL:`${{API_SERVER_URL}}/api/v1/recipe/categories`,
  // MEALS_URL:`${{API_SERVER_URL}}/api/v1/recipe/meals`,
  // FAV_RECIPES_URL:`${{API_SERVER_URL}}/api/v1/recipe/favoriteRecipes`,
  // ADD_FAV_RECIPES_URL:`${{API_SERVER_URL}}/api/v1/recipe/addToFavorites`,
  // REMOVE_FAV_RECIPES_URL:`${{API_SERVER_URL}}/api/v1/recipe/removeFromFavorites`,
  // GET_RECIPY_BY_ID_URL:`${{API_SERVER_URL}}/api/v1/recipe/meals/`,
  // USER_API_URL : `${{API_SERVER_URL}}/api/v1/user`

};
