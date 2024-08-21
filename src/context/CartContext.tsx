// src/app/context/CartContext.tsx


'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Recipe } from '@/types/recipe';

interface CartContextType {
  cartItems: Recipe[];
  addToCart: (recipe: Recipe) => void;
  removeFromCart: (index: number) => void;
  incrementQuantity: (idMeal: string) => void;
  decrementQuantity: (idMeal: string) => void;
  search: (query: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (recipe: Recipe) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find((item) => item.idMeal === recipe.idMeal);
      if (existingItem) {
        return prevItems.map((item) =>
          item.idMeal === recipe.idMeal
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...recipe, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems(prevItems => {
      const updatedCart = [...prevItems];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  const incrementQuantity = (idMeal: string) => {
    setCartItems(prevItems =>
      prevItems.map((item) =>
        item.idMeal === idMeal
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (idMeal: string) => {
    setCartItems(prevItems =>
      prevItems.map((item) =>
        item.idMeal === idMeal && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const search = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredRecipes(cartItems);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = cartItems.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredRecipes(filtered);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  // Add clearCart to the context provider value
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity, search, clearCart }}>
      {children}
    </CartContext.Provider>
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity, search }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}