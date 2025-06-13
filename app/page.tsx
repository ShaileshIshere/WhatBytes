import ProductGrid from "@/components/ProductGrid";
import Sidebar from "@/components/SideBar";
import { SearchInput } from "@/components/SearchInput";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "WhatBytes - Home",
    description: "Browse our selection of products",
};

type Props = {
    params: Promise<{ [key: string]: string | string[] | undefined }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    const categoryParam = resolvedSearchParams.category as string | undefined;
    const priceParam = resolvedSearchParams.price as string | undefined;
    const searchQuery = resolvedSearchParams.search as string | undefined;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 shrink-0">
                    <Suspense>
                        <Sidebar />
                    </Suspense>
                </div>
                <div className="flex-1">
                    <div className="md:hidden mb-6">
                        <Suspense>
                            <SearchInput />
                        </Suspense>
                    </div>
                    <Suspense>
                        <ProductGrid
                            categoryFilter={categoryParam}
                            priceFilter={priceParam}
                            searchQuery={searchQuery}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
