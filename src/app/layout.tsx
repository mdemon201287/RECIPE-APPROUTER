// src/app/layout.tsx


import './globals.css';
import { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import CartNavbar from '@/components/CartNavbar';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Red Onion Foods',
  description: 'A recipe application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <CartNavbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}