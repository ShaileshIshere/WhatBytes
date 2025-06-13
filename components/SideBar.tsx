"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { fetchCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            setIsLoading(true);
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getCategories();
    }, []);

    useEffect(() => {
        // Initialize filters from URL params only once
        if (!isInitialized) {
            const categoryParam = searchParams.get("category");
            if (categoryParam) {
                setSelectedCategories([categoryParam]);
            }

            const priceParam = searchParams.get("price");
            if (priceParam) {
                const [min, max] = priceParam.split("-").map(Number);
                setPriceRange([min, max || 1000]);
            }

            setIsInitialized(true);
        }
    }, [searchParams, isInitialized]);

    const updateFilters = useCallback(() => {
        if (!isInitialized) return;

        const params = new URLSearchParams(searchParams.toString());

        // Update category filter
        if (selectedCategories.length === 1) {
            params.set("category", selectedCategories[0]);
        } else {
            params.delete("category");
        }

        // Update price filter
        if (priceRange[0] > 0 || priceRange[1] < 1000) {
            params.set("price", `${priceRange[0]}-${priceRange[1]}`);
        } else {
            params.delete("price");
        }

        // Preserve search query if exists
        const search = searchParams.get("search");
        if (search) {
            params.set("search", search);
        }

        const newUrl = `/?${params.toString()}`;
        const currentUrl = `/?${searchParams.toString()}`;

        // Only navigate if URL actually changed
        if (newUrl !== currentUrl) {
            router.push(newUrl);
        }
    }, [selectedCategories, priceRange, searchParams, router, isInitialized]);

    const handleCategoryChange = (category: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories([category]);
        } else {
            setSelectedCategories([]);
        }
    };

    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
    };

    // Update filters when dependencies change, but only after initialization
    useEffect(() => {
        if (isInitialized) {
            const timeoutId = setTimeout(() => {
                updateFilters();
            }, 300); // Debounce the updates

            return () => clearTimeout(timeoutId);
        }
    }, [updateFilters, isInitialized]);

    return (
        <aside className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 space-y-8 min-w-[240px] sticky top-24">
            {/* Categories */}
            <div>
                <h3 className="font-semibold mb-4 text-gray-800 text-lg tracking-tight">
                    Categories
                </h3>
                {isLoading ? (
                    <div className="space-y-2">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 animate-pulse"
                            >
                                <div className="h-6 w-7 rounded bg-gray-200"></div>
                                <div className="h-6 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-1">
                        {categories.map((category) => (
                            <Label
                                key={category}
                                htmlFor={`category-${category}`}
                                className={cn(
                                    "flex items-center gap-3 px-2 py-2 rounded-md transition cursor-pointer",
                                    selectedCategories.includes(category)
                                        ? "bg-blue-50"
                                        : "hover:bg-gray-100",
                                )}
                            >
                                <Checkbox
                                    id={`category-${category}`}
                                    checked={selectedCategories.includes(
                                        category,
                                    )}
                                    onCheckedChange={(checked) =>
                                        handleCategoryChange(
                                            category,
                                            checked as boolean,
                                        )
                                    }
                                />
                                <span className="text-sm capitalize text-gray-700">
                                    {category}
                                </span>
                            </Label>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold mb-4 text-gray-800 text-lg tracking-tight">
                    Price Range
                </h3>
                <div className="rounded-lg px-4 py-4">
                    <Slider
                        value={priceRange}
                        min={0}
                        max={1000}
                        step={10}
                        onValueChange={handlePriceChange}
                        className="mb-4 accent-blue-600"
                    />
                    <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            ${priceRange[0]}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            ${priceRange[1]}
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
