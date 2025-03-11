'use client';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import Cart from './Cart';

export default function Header() {
  const { items } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        MyShop
      </Link>

      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="relative"
        aria-label="Toggle cart"
      >
        <ShoppingCartIcon className="h-8 w-8 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm px-2 rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </header>
  );
}
