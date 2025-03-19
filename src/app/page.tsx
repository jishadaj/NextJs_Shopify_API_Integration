"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { debounce } from 'lodash'
import ProductList from "@/components/ProductListing";
import ProductFilter from "@/components/ProductFilter";
import { productTypes, vendors } from "./Data/filterData";
import { getProducts } from "@/lib/shopify";
import { useInfiniteQuery } from "@tanstack/react-query";

type Product = {
  id: string;
  title: string;
  image: string;
};


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState<{ productType?: string; vendor?: string; minPrice?: number; maxPrice?: number }>({});
  const [home, setHome] = useState(true)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [isLipOpen, setIsLipOpen] = useState(false)
  const [isFaceOpen, setIsFaceOpen] = useState(false)
  const [isKitOpen, setIsKitOpen] = useState(false)
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);


  const debounceSearch = useCallback(
    debounce((query: string) => {
      setDebouncedQuery(query);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debounceSearch(e.target.value);
  };

  const {
    data,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["modal-products"],
    queryFn: async () => {
      return await getProducts(4);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.products?.pageInfo?.hasNextPage
      ? lastPage.products.pageInfo.endCursor
      : undefined,
    staleTime: 1000 * 60 * 5,
  });

  const products: Product[] = useMemo(() => {
    return data?.pages?.[0]?.products?.edges.map((item) => ({
      id: item.node.id,
      title: item.node.title,
      image: item.node.featuredImage?.url || "fallback-image-url.jpg",
    })) || [];
  }, [data]);

  console.log(1111, products);


  useEffect(() => {
    if (products.length > 0) {
      setShuffledProducts(products);
    }
  }, [products]);

  const shuffleArray = (array: Product[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleButtonClick = (buttonType: string) => {
    setIsLipOpen(buttonType === 'lip');
    setIsFaceOpen(buttonType === 'face');
    setIsKitOpen(buttonType === 'kit');

    const shuffled = shuffleArray(products);
    setShuffledProducts(shuffled);
  };


  return (
    <div className="p-5">
      {home ? (
        <>
          <section className="w-full h-[900px] flex flex-col items-center  text-center bg-gradient-to-r rounded-3xl p-8 border border-orange-600 gap-5" style={{
            backgroundImage: "url('/group 831.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>


            <div className="w-full h-10 items-center justify-center text-center bg-orange-600 rounded-3xl text-white">
              <h1 className="text-white text-2xl font-bold items-center justify-center">FREE UK SHIPPING ON ORDERS OVER £40</h1>
            </div>


            <div className="w-full flex items-center justify-between p-4 h-20">

              <div className="flex gap-16 border border-orange-600 rounded-3xl justify-evenly p-4 h-full items-center">
                <button
                  className={`font-extrabold px-4 py-2 rounded-3xl transition-all ${isShopOpen ? "bg-orange-600 text-white" : "hover:bg-orange-600 hover:text-white"
                    }`}
                  onClick={() => { setIsShopOpen(true), refetch(); }}
                >SHOP</button>
                <h1 className="font-extrabold">ABOUT</h1>
                <h1 className="font-extrabold">LEARN</h1>
              </div>


              <div className="flex w-1/3 justify-center items-center h-full">
                <h1 className="h-full flex items-center text-3xl font-bold text-orange-600">PROJECT</h1>
              </div>


              <div className="flex w-1/3 justify-evenly items-center p-4 h-20">

                <h1 className="border border-orange-600 rounded-3xl p-4 font-extrabold h-full flex items-center">
                  SEARCH
                </h1>


                <div className="flex border border-orange-600 rounded-3xl font-extrabold items-center justify-between h-full px-4">
                  <h1>CART</h1>


                  <div className="border border-orange-600 rounded-full flex items-center justify-center w-12 h-full">
                    <h1 className="font-extrabold">0</h1>
                  </div>
                </div>
              </div>
            </div>


            <div className="absolute bottom-8 left-8 text-left p-12">
              <h1 className="text-6xl font-extrabold leading-tight text-orange-600">
                BIGGER LIPS, <br /> BIGGER ENERGY
              </h1>
              <h2 className="text-xl font-light mt-2">Our famous lip liner lines, fills and plumps so you can cheat <br /> your way to an instant lip lift</h2>

              <button className="mt-6 border border-orange-600 rounded-3xl p-4 font-extrabold text-orange-600">
                SHOP PLUMP & FILL
              </button>
            </div>

          </section>

          {/* image card section */}
          <div className="w-full flex justify-center gap-12 mt-40">
            {/* Card 1 */}
            <div
              className="relative w-1/3 h-[650px] bg-cover bg-center rounded-3xl overflow-hidden"
              style={{ backgroundImage: "url('/Placement_Area1.png')" }}
            >
              <div className="absolute top-6 left-6">
                <h2 className="text-2xl font-semibold text-white">SHOP</h2>
                <p className="text-6xl font-extrabold text-white">LIP</p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="relative w-1/3 h-[650px] bg-cover bg-center rounded-3xl overflow-hidden"
              style={{ backgroundImage: "url('/image3.webp')" }}
            >
              <div className="absolute top-6 left-6">
                <h2 className="text-2xl font-semibold text-white">SHOP</h2>
                <p className="text-6xl font-extrabold text-white">FACE</p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="relative w-1/3 h-[650px] bg-cover bg-center rounded-3xl overflow-hidden"
              style={{ backgroundImage: "url('/image1.webp')" }}
            >
              <div className="absolute top-6 left-6">
                <h2 className="text-2xl font-semibold text-white">SHOP</h2>
                <p className="text-6xl font-extrabold text-white">KIT</p>
              </div>
            </div>
          </div>

          <section className="w-full flex gap-4 mt-16 px-8 justify-between">
            <li className="text-orange-600 text-2xl font-extrabold flex items-center gap-4">
              <span className="text-4xl font-bold flex items-center justify-center">•</span> CLINICALLY PROVEN TO PLUMP
            </li>
            <li className="text-orange-600 text-2xl font-extrabold flex items-center gap-4">
              <span className="text-4xl font-bold flex items-center justify-center">•</span> 100% NATURAL
            </li>
            <li className="text-orange-600 text-2xl font-extrabold flex items-center gap-4">
              <span className="text-4xl font-bold flex items-center justify-center">•</span> VEGAN
            </li>
            <li className="text-orange-600 text-2xl font-extrabold flex items-center gap-4">
              <span className="text-4xl font-bold flex items-center justify-center">•</span> CRUELTY-FREE
            </li>

          </section>

          <div className="w-full flex justify-between items-center mt-12 px-8 pt-16">

            <h2 className="text-orange-600 text-3xl font-extrabold">BEST IN PLUMP</h2>

            <div className="w-12 h-12 flex items-center justify-center border-2 border-orange-600 rounded-full">
              <span className="text-orange-600 text-3xl font-extrabold">→</span>
            </div>
          </div>

          <section className="w-full px-8 mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              <div className="relative flex items-end justify-center border border-orange-600 rounded-xl overflow-hidden h-[600px]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/Rectangle 81.webp')` }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <button className="relative z-10 bg-orange-600 text-white font-bold text-lg px-6 py-2 rounded-full border-2 border-white mb-4">
                  SHOP NOW
                </button>
              </div>
              {[
                { name: "PLUMP JUICE", description: "Plumping & hydrating lip oil", price: "£18", image: "/image1.webp" },
                { name: "EXTREME MATTE PLUMPING PRIMER", description: "Extreme plumping oil primer", price: "£18", image: "/image2.webp" },
                { name: "PLUMP & FILL", description: "Plumping lip liner", price: "£12", image: "/image3.webp" },
              ].map((product, index) => (
                <div key={index} className="flex flex-col items-center border border-orange-600 rounded-xl p-4 h-[600px]">


                  <div
                    className="w-full h-[400px]  bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>


                  <h3 className="text-xl font-bold text-gray-900 mt-4">{product.name}</h3>


                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>


                  <p className="text-lg font-semibold text-orange-600 mt-2">{product.price}</p>

                  <div className="flex gap-2 mt-3">
                    {["white", "pink", "orange", "red"].map((color, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border border-gray-400`}
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}


              {isShopOpen && (
                <div className="fixed top-0 left-0 w-full mt-[200px] bg-black bg-opacity-40 flex items-center justify-center " >
                  <div className="bg-white w-full h-[350px] flex relative border-2 border-orange-600">


                    <div className="w-[70%] p-6">

                      <div className="flex gap-4 mb-6">
                        <button onClick={() => handleButtonClick('lip')} className={`border border-orange-600 font-extrabold px-8 py-2 rounded-3xl transition-all ${isLipOpen ? "bg-orange-600 text-white" : "hover:bg-orange-600 hover:text-white"
                          }`}
                        >
                          LIP
                        </button>
                        <button onClick={() => handleButtonClick('face')} className={`border border-orange-600 font-extrabold px-8 py-2 rounded-3xl transition-all ${isFaceOpen ? "bg-orange-600 text-white" : "hover:bg-orange-600 hover:text-white"
                          }`}>
                          FACE
                        </button>
                        <button onClick={() => handleButtonClick('kit')} className={`border border-orange-600 font-extrabold px-8 py-2 rounded-3xl transition-all ${isKitOpen ? "bg-orange-600 text-white" : "hover:bg-orange-600 hover:text-white"
                          }`}>
                          KIT
                        </button>
                      </div>

                      <div className="flex gap-4">

                        {
                          status === "pending" ? (
                            <p>Loading products...</p>
                          ) : (
                            shuffledProducts.map((product) => (
                              <div
                                key={product.id}
                                className="w-full h-40 bg-gray-200 border border-orange-600 rounded-lg relative overflow-hidden"
                              >
                                {/* Image as background */}
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-full h-full object-contain absolute inset-0"
                                />
                                {/* Title at the bottom of the image */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                                  <p className="font-bold">{product.title}</p>
                                </div>
                              </div>
                            ))
                          )
                        }

                      </div>
                    </div>

                    <div className="ml-16 border border-orange-600"></div>

                    {/* Right Section (40%) */}
                    <div className="w-[30%] flex flex-col p-10 justify-center">
                      <ul className="flex flex-col gap-4 text-lg font-semibold">
                        <li className="cursor-pointer hover:text-orange-600">ABOUT PROJECT</li>
                        <li className="cursor-pointer hover:text-orange-600">CLINICALLY PROVEN</li>
                        <li className="cursor-pointer hover:text-orange-600">FAQS</li>
                        <li className="cursor-pointer hover:text-orange-600">CONTACT US</li>
                      </ul>
                    </div>

                    {/* Close Button */}
                    <button
                      className="absolute top-4 right-4 text-orange-600 font-bold text-2xl"
                      onClick={() => setIsShopOpen(false)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

            </div>
          </section>

        </>
      ) : (
        <>
          <div className="container mx-auto p-4">
            {/* Hero Section */}
            <section className="w-full h-[400px] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Discover the Latest Trends
              </h1>
              <p className="text-lg md:text-xl text-white mb-6">
                Explore our exclusive collection of fashion & accessories.
              </p>
              <Link href="/">
                <button className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-200 rounded-lg text-lg font-semibold">
                  Shop Now
                </button>
              </Link>
            </section>

            <div className="my-6 flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg">
              {/* Search Field */}
              <input
                type="text"
                placeholder="Search by title or product type..."
                className="h-12 px-4 border border-gray-300 rounded-lg w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />

              {/* Filters Section */}
              <div className="w-full md:w-2/3 flex items-center gap-4">
                <ProductFilter
                  onFilterChange={setFilters}
                  productTypes={productTypes}
                  vendors={vendors}
                />
              </div>
            </div>

            <ProductList searchQuery={debouncedQuery} filters={filters} />
          </div>
        </>
      )}
    </div>
  );
}