// src/app/checkout/page.tsx

'use client';

import { useCart } from '@/context/CartContext';

export default function Checkout() {
  const { cartItems } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here (e.g., API call or redirect to payment gateway)
    console.log('Checkout initiated');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-6">
            {cartItems.map((item, index) => (
              <li key={index} className="border-b border-gray-200 py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.strMeal}</h3>
                  <p className="text-gray-500">${item.price} x {item.quantity}</p>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-xl mb-6">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Complete Purchase
          </button>
        </div>
      )}
    </div>
  );
}
