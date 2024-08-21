// src/app/types/recipes.ts

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  price: number; // Make this optional if it's not always provided
  quantity: number; // Add this field
  [key: string]: string | number | null;
}

export interface Ingredient {
  ingredient: string;
  measure: string;
}
