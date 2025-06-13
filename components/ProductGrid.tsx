"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/data";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";
import { Button } from "./ui/button";

interface ProductGridProps {
    categoryFilter?: string;
    priceFilter?: string;
    searchQuery?: string;
}

export default function ProductGrid({
    categoryFilter,
    priceFilter,
    searchQuery,
}: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const INITIAL_LOAD = 9; // Initial products to show
    const LOAD_MORE_COUNT = 6; // Products to load on "Load More"

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            try {
                const data = await fetchProducts();
                let filteredProducts = data;

                // Apply filters
                if (categoryFilter) {
                    filteredProducts = filteredProducts.filter(
                        (product) => product.category === categoryFilter,
                    );
                }

                if (priceFilter) {
                    const [min, max] = priceFilter.split("-").map(Number);
                    filteredProducts = filteredProducts.filter(
                        (product) =>
                            product.price >= min && product.price <= max,
                    );
                }

                if (searchQuery) {
                    filteredProducts = filteredProducts.filter((product) =>
                        product.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                    );
                }

                setProducts(filteredProducts);
                // Show only first 9 products initially
                setDisplayedProducts(filteredProducts.slice(0, INITIAL_LOAD));
                setCurrentPage(1);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getProducts();
    }, [categoryFilter, priceFilter, searchQuery]);

    const handleLoadMore = () => {
        setIsLoadingMore(true);

        // Simulate loading delay for better UX
        setTimeout(() => {
            const nextPage = currentPage + 1;
            const startIndex =
                INITIAL_LOAD + (currentPage - 1) * LOAD_MORE_COUNT;
            const endIndex = startIndex + LOAD_MORE_COUNT;

            const moreProducts = products.slice(startIndex, endIndex);
            setDisplayedProducts((prev) => [...prev, ...moreProducts]);
            setCurrentPage(nextPage);
            setIsLoadingMore(false);
        }, 500);
    };

    const hasMoreProducts = displayedProducts.length < products.length;

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-4 animate-pulse"
                    >
                        <div className="w-full h-96 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">No products found</h2>
                <p className="text-gray-500">
                    Try adjusting your filters or search query.
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Load More Button */}
            {hasMoreProducts && (
                <div className="flex justify-center mt-8">
                    <Button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        variant="primary"
                        className="px-8 py-3 text-lg"
                    >
                        {isLoadingMore ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Loading...
                            </div>
                        ) : (
                            `Load More`
                        )}
                    </Button>
                </div>
            )}

            {/* Results Summary */}
            {/* <div className="text-center mt-6 text-gray-600">
        Showing {displayedProducts.length} of {products.length} products
      </div> */}
        </div>
    );
}
