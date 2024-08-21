// src/app/ClientPage.tsx


'use client';

import { useState, useEffect } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { useCart } from '@/context/CartContext';

async function fetchRecipes(): Promise<Recipe[]> {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await res.json();
  return data.meals.map((meal: any) => ({
    ...meal,
    price: Math.floor(Math.random() * 100) + 1,
    quantity: 1,
  }));
}

export default function ClientPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const { addToCart, search } = useCart();

  useEffect(() => {
    async function loadRecipes() {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
      setFilteredRecipes(fetchedRecipes);
    }
    loadRecipes();
  }, []);

  const handleSearch = (query: string) => {
    search(query);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Recipe List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}