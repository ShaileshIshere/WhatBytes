"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import type { CartItem } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

export default function CartPageClient() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const shipping = subtotal > 0 ? 10 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="text-center py-16">
                    <h1 className="text-2xl font-bold mb-4">
                        Your cart is empty
                    </h1>
                    <p className="text-gray-500 mb-8">
                        Looks like you haven&apos;t added any products to your
                        cart yet.
                    </p>
                    <Link href="/">
                        <Button variant={"primary"} className="cursor-pointer">
                            <ArrowLeft className="mr-2 h-4 w-4 cursor-pointer" />{" "}
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-8">
                Shopping Cart
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <CartItemCard
                                key={item.id}
                                item={item}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                            />
                        ))}
                    </div>

                    <div className="mt-8 flex justify-between">
                        <Link href="/">
                            <Button
                                variant="primary"
                                className="cursor-pointer"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Continue
                                Shopping
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={clearCart}
                            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                        </Button>
                    </div>
                </div>

                <div className="xl:w-80 lg:w-72 shrink-0">
                    <div className="border rounded-lg p-6 bg-gray-50 sticky top-20">
                        <h2 className="font-bold text-lg mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>

                            <Separator className="my-2" />

                            <div className="flex justify-between font-bold text-base">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6 cursor-pointer"
                            variant={"primary"}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CartItemCard({
    item,
    updateQuantity,
    removeFromCart,
}: {
    item: CartItem;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
}) {
    return (
        <div className="flex gap-4 border rounded-lg p-4 w-full">
            <div className="w-16 md:w-20 h-16 md:h-20 relative shrink-0">
                <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="80px"
                />
            </div>

            <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <Link
                        href={`/product/${item.id}`}
                        className="font-medium hover:underline truncate pr-2"
                        title={item.title}
                    >
                        {item.title}
                    </Link>
                    <div className="font-bold whitespace-nowrap shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>

                <div className="text-sm text-gray-500 mt-1">
                    ${item.price.toFixed(2)} each
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-md">
                        <button
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    Math.max(1, item.quantity - 1),
                                )
                            }
                            className="px-2 py-1 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 border-x">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 hover:bg-gray-100"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="
              ml-2 shrink-0 rounded-full p-2
              bg-red-50 text-red-500
              transition-all duration-150
              hover:bg-red-500 hover:text-white
              hover:scale-110
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-red-300
              shadow-sm
              mr-2 mb-1
            "
                        aria-label="Remove item"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
