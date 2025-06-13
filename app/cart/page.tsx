import type { Metadata } from "next";
import { Suspense } from "react";
import CartPageClient from "./CartPage";

export const metadata: Metadata = {
    title: "WhatBytes - Shopping Cart",
    description: "Review and manage items in your shopping cart",
};

export default function CartPage() {
    return (
        <Suspense fallback={<div>Loading cart...</div>}>
            <CartPageClient />
        </Suspense>
    );
}
