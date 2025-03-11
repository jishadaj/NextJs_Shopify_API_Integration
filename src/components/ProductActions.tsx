'use client';

import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/shopify';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAddToCart = () => {
    const variant = product.variants.edges[0].node;
    addItem({
      id: variant.id,
      title: product.title,
      price: parseFloat(variant.price.amount),
      quantity: 1,
    });
  };

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
      <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
        Buy Now
      </button>
    </div>
  );
}
