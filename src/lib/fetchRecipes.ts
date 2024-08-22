import { Recipe } from "@/types/recipe";

export async function getRecipes(category?: string): Promise<Recipe[]> {
  let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  if (category) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await res.json();

    return data.meals.map((meal: any) => ({
      ...meal,
      price: Math.floor(Math.random() * 100) + 1,
      quantity: 1,
    })) || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}
