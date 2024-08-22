import Link from 'next/link';
import { Recipe } from '@/types/recipe';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: Recipe;
  addToCart: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, addToCart }: RecipeCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
      <Link href={`/recipes/${recipe.idMeal}`}>
        <div className="cursor-pointer">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{recipe.strMeal}</h2>
            <p className="text-gray-500 font-medium">${recipe.price}</p>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          onClick={() => addToCart(recipe)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
