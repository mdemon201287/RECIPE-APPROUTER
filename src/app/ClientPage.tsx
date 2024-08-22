'use client'; // Add this directive at the top of the file

import React, { useState, useEffect } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { useCart } from '@/context/CartContext';
import { getRecipes } from '@/lib/fetchRecipes';

export default function ClientPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadRecipes() {
      const fetchedRecipes = await getRecipes(activeCategory);
      setRecipes(fetchedRecipes);
      setFilteredRecipes(fetchedRecipes);
    }
    loadRecipes();
  }, [activeCategory]);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchQuery, recipes]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">BEST FOOD WAITING FOR YOUR BELLY</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 w-full max-w-md transition-all duration-300 ease-in-out hover:border-red-500"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full ml-4 transition-all duration-300 ease-in-out">
          Search
        </button>
      </div>
      <div className="flex space-x-8 mb-8 justify-center">
        <button
          className={`font-medium pb-2 transition-colors duration-300 ${
            activeCategory === 'breakfast'
              ? 'text-red-500 font-bold border-b-4 border-red-500'
              : 'text-gray-500 hover:text-red-500'
          }`}
          onClick={() => handleCategoryChange('breakfast')}
        >
          BREAKFAST
        </button>
        <button
          className={`font-medium pb-2 transition-colors duration-300 ${
            activeCategory === 'lunch'
              ? 'text-red-500 font-bold border-b-4 border-red-500'
              : 'text-gray-500 hover:text-red-500'
          }`}
          onClick={() => handleCategoryChange('lunch')}
        >
          LUNCH
        </button>
        <button
          className={`font-medium pb-2 transition-colors duration-300 ${
            activeCategory === 'dinner'
              ? 'text-red-500 font-bold border-b-4 border-red-500'
              : 'text-gray-500 hover:text-red-500'
          }`}
          onClick={() => handleCategoryChange('dinner')}
        >
          DINNER
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
