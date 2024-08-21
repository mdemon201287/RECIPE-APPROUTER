// src/app/lib/fetchRecipes.ts

import { Recipe } from "@/types/recipe";

export async function getRecipes(category?: string): Promise<Recipe[]> {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (category) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }
  
    const res = await fetch(url);
    const data = await res.json();
  
    return data.meals || []; // Ensure it returns an empty array if no data
  }
  