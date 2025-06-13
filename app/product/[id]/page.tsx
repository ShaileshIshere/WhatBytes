import type { Metadata } from "next";
import { Suspense } from "react";
import ProductDetailClient from "./ProductPage";

export const metadata: Metadata = {
    title: "WhatBytes - Product Detail",
    description: "Review product details and add to cart",
};

export default function ProductDetail() {
    return (
        <Suspense fallback={<div>Loading cart...</div>}>
            <ProductDetailClient />
        </Suspense>
    );
}
