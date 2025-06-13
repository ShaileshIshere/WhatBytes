"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { Button } from "./ui/button";
import { SearchInput } from "./SearchInput";

export default function Header() {
    const { cart } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            setTotalItems(cart.reduce((sum, item) => sum + item.quantity, 0));
        }
    }, [cart, mounted]);

    return (
        <header className="bg-[#1565c0] py-3 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                {/* Mobile Layout */}
                <div className="flex flex-col md:hidden gap-3">
                    {/* Logo - Center on Mobile */}
                    <div className="flex justify-center">
                        <Link
                            href="/"
                            className="font-bold text-white text-2xl"
                        >
                            WhatBytes
                        </Link>
                    </div>

                    {/* Search Bar and Cart - Same Row on Mobile */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <Suspense fallback={null}>
                                <SearchInput />
                            </Suspense>
                        </div>

                        {/* Cart - Icon Only on Mobile */}
                        <Link href="/cart">
                            <Button
                                className="
                p-3 bg-[#003879] text-white
                shadow-md transition-all
                hover:bg-[#0d47a1] active:scale-95
                focus:outline-none focus:ring-2 focus:ring-[#1565c0]/50
                relative cursor-pointer
              "
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {mounted && totalItems > 0 && (
                                    <span
                                        className="
                    absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1
                    bg-red-500 text-white text-xs font-bold
                    rounded-full flex items-center justify-center
                    border-2 border-white
                    shadow
                  "
                                    >
                                        {totalItems}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="font-bold text-white text-2xl">
                        WhatBytes
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 flex justify-center">
                        <div className="max-w-md w-full">
                            <Suspense fallback={null}>
                                <SearchInput />
                            </Suspense>
                        </div>
                    </div>

                    {/* Cart Button */}
                    <Link href="/cart">
                        <Button
                            className="
              flex items-center gap-2 px-4 py-2
              bg-[#003879] text-white font-semibold
              shadow-md transition-all
              hover:bg-[#0d47a1] active:scale-95
              focus:outline-none focus:ring-2 focus:ring-[#1565c0]/50
              relative cursor-pointer
            "
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span>Cart</span>
                            {mounted && totalItems > 0 && (
                                <span
                                    className="
                  absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1
                  bg-red-500 text-white text-xs font-bold
                  rounded-full flex items-center justify-center
                  border-2 border-white
                  shadow
                "
                                >
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
