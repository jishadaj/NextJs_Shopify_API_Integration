"use client";

import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify";
import { Product } from "@/types/shopify";
import ProductCard from "@/components/ProductCard";
import { useInView } from "react-intersection-observer";
import SkeletonProductCard from "./SkeletonProductCard";

export default function ProductList({ searchQuery, filters }: {
    searchQuery: string;
    filters: { productType?: string; vendor?: string; minPrice?: number; maxPrice?: number }
}) {
    const { ref, inView } = useInView();
    // const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["products", searchQuery],
        queryFn: async ({ pageParam }: { pageParam?: string }) => {
            return await getProducts(9,
                pageParam,
                searchQuery,
                filters.productType,
                filters.minPrice ? Number(filters.minPrice) : undefined,
                filters.maxPrice ? Number(filters.maxPrice) : undefined,
                filters.vendor
            );
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) =>
            lastPage.products.pageInfo.hasNextPage
                ? lastPage.products.pageInfo.endCursor
                : undefined,
        staleTime: 1000 * 60 * 5,
    });

    React.useEffect(() => {
        refetch();
    }, [searchQuery, filters, refetch]);

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (status === "pending") {
        return (
            <div className="container mx-auto p-4">

                <h2 className="text-3xl font-bold text-center text-blue-600 my-8">
                    Loading Products...
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <SkeletonProductCard key={index} />
                    ))}
                </div>

            </div>
        );;
    }

    if (status === "error") {
        return <div>Error loading products</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-center text-blue-600 my-8">
                Our Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.pages.map((page, i) => (
                    <React.Fragment key={i}>
                        {page.products.edges.map(({ node }: { node: Product }) => (
                            <ProductCard key={node.id} product={node} />
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <div ref={ref} className="text-center my-8">
                {isFetchingNextPage ? (
                    <p>Loading more products...</p>
                ) : hasNextPage ? (
                    <p>Scroll to load more</p>
                ) : (
                    <>
                        <p>No more products to load</p>
                        <button
                            onClick={scrollToTop}
                            className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg"
                        >
                            ↑
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
