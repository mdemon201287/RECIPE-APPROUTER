// src/components/CartNavbar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartNavbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Red Onion Foods
        </Link>
        <div className="relative">
          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={toggleCart}
          >
            Cart ({cartItems.length})
          </button>
          {isCartOpen && (
            <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-64 z-10">
              <ul>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-200 px-4 py-2 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{item.strMeal}</h3>
                      <p className="text-gray-500">${item.price}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => decrementQuantity(item.idMeal)}
                        className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.idMeal)}
                        className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-4"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <Link href="/checkout">
    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
      Checkout
    </button>
  </Link>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}