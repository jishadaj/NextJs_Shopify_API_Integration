"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { debounce } from 'lodash'
import ProductList from "@/components/ProductListing";
import ProductFilter from "@/components/ProductFilter";
import { productTypes, vendors } from "./Data/filterData";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState<{ productType?: string; vendor?: string; minPrice?: number; maxPrice?: number }>({});

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


  return (
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

      <div className="my-6 flex flex-col md:flex-row items-center gap-4  p-4 rounded-lg">
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
  );
}