"use client";
import React, { useState } from "react";

interface FilterProps {
    onFilterChange: (filters: { productType?: string; vendor?: string; minPrice?: number; maxPrice?: number }) => void;
    productTypes: string[];
    vendors: string[];
}

export default function ProductFilter({ onFilterChange, productTypes, vendors }: FilterProps) {
    const [productType, setProductType] = useState("");
    const [vendor, setVendor] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleApplyFilters = () => {
        onFilterChange({
            productType: productType || undefined,
            vendor: vendor || undefined,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        });
    };

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-4 items-center p-4 rounded-lg">
            <select className="h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white" value={productType} onChange={(e) => setProductType(e.target.value)}>
                <option value="">All Product Types</option>
                {productTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <select className="h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white" value={vendor} onChange={(e) => setVendor(e.target.value)}>
                <option value="">All Vendors</option>
                {vendors.map((vendor) => (
                    <option key={vendor} value={vendor}>{vendor}</option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Min Price"
                className="h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Max Price"
                className="h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button
                className="h-12 w-28 min-w-[120px] px-4 bg-blue-500 text-white rounded-lg 
               hover:bg-blue-600 transition-all whitespace-nowrap flex-shrink-0"
                onClick={handleApplyFilters}
            >
                Apply Filters
            </button>
        </div>
    );
}
