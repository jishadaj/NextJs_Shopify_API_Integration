import { getProduct, getRelatedProducts } from '@/lib/shopify';
import Image from 'next/image';
import ProductActions from '@/components/ProductActions';
import { Product } from '@/types/shopify';
import ProductCard from '@/components/ProductCard';
import Head from 'next/head';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const { product } = await getProduct(decodedId);
  const { products } = await getRelatedProducts()

  const allProducts = products.edges.map((edge) => edge.node)

  const relatedProducts = allProducts.filter(
    (p: Product) => p.productType === product.productType && p.id !== product.id
  );

  const variant = product.variants.edges[0].node;


  return (
    <>
      <Head>
        <title>{product.title} | MyShop</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.title}, ${product.productType}, buy online`} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.featuredImage?.url} />
        <meta property="og:type" content="product" />
      </Head>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="relative w-full h-[500px] rounded-lg shadow-lg overflow-hidden">
            <Image
              src={product.featuredImage?.url || '/placeholder_image.jpg'}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-lg text-gray-700">{product.description}</p>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>
              <span className="text-gray-600 text-sm">(1521 Reviews)</span>
            </div>
            <ul className="text-sm list-disc list-inside text-gray-700">
              <li>High-quality material</li>
              <li>Lightweight & comfortable</li>
              <li>Fast shipping available</li>
            </ul>

            <ul className="text-sm list-disc list-inside text-gray-700">
              <li><strong>Brand:</strong> {product.vendor}</li>
              <li><strong>Category:</strong> {product.productType}</li>
              <li><strong>Stock:</strong>
                {product.totalInventory > 0 ? (
                  <span className="text-green-600"> {product.totalInventory} Available</span>
                ) : (
                  <span className="text-red-600"> Out of Stock</span>
                )}
              </li>
            </ul>

            <p className="text-2xl font-semibold text-blue-600">
              {variant.price.amount} {variant.price.currencyCode}
            </p>

            <ProductActions product={product} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );

}
