// src/components/Navbar.tsx


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity, search } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    search(searchQuery);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/path-to-logo.png" alt="Logo" width={50} height={50} />
            <span className="text-xl font-bold text-gray-800 ml-2">Red Onion Foods</span>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Search"
            />
            <button
              className="absolute right-0 top-0 bottom-0 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleSearchSubmit}
            >
              Search
            </button>
          </div>
          <Link href="/signin" className="text-gray-700 hover:text-red-500 transition-colors">
          Sign In
          </Link>
          <Link href="/signup" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105">
            Sign Up
          </Link>
          <button
            className="relative bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105"
            onClick={toggleCart}
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-black rounded-full px-2 text-sm">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {isCartOpen && cartItems.length > 0 && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-80 z-50">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li key={index} className="px-4 py-2 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.strMeal}</h3>
                  <p className="text-sm text-gray-500">${item.price}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button onClick={() => decrementQuantity(item.idMeal)} className="text-gray-600 hover:text-red-500">-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.idMeal)} className="text-gray-600 hover:text-red-500">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <Link href="/checkout" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105">
              Checkout
          </Link>
        </div>
      )}
    </nav>
  );
}