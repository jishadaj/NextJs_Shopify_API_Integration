'use client';

import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/shopify';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
    <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white flex flex-col items-center">
      
      <Link href={`/products/${encodeURIComponent(product.id)}`} className="block w-full">
        <div className="relative w-full h-56 overflow-hidden rounded-lg">
          <Image
            src={product.featuredImage?.url || '/placeholder_image.jpg'}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Product Details */}
        <div className="w-full text-center mt-4">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {product.variants.edges[0].node.price.amount}{' '}
            {product.variants.edges[0].node.price.currencyCode}
          </p>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
