"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/types";
import { fetchProductById } from "@/lib/data";

export default function ProductDetailClient() {
    const params = useParams();
    const id = params.id as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true);
            try {
                const productData = await fetchProductById(Number.parseInt(id));
                setProduct(productData);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity });
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="animate-pulse flex flex-col md:flex-row gap-8 w-full max-w-4xl">
                    <div className="w-full md:w-1/2 bg-gray-200 rounded-lg aspect-square"></div>
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-12 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Product not found</h2>
                    <p className="mt-2">
                        The product you are looking for does not exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
                <div className="w-full md:w-1/2">
                    <div className="aspect-square relative rounded-lg overflow-hidden border">
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                        i < Math.round(product.rating.rate)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                            ({product.rating.count} reviews)
                        </span>
                    </div>

                    <div className="text-2xl font-bold">
                        ${product.price.toFixed(2)}
                    </div>

                    <div className="py-4">
                        <p className="text-gray-600">{product.description}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium mb-1">Category</p>
                        <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {product.category}
                        </div>
                    </div>

                    <div className="pt-4">
                        <p className="text-sm font-medium mb-2">Quantity</p>
                        <div className="flex items-center border rounded-md w-fit">
                            <button
                                onClick={decreaseQuantity}
                                className="px-3 py-2 hover:bg-gray-100"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 border-x">
                                {quantity}
                            </span>
                            <button
                                onClick={increaseQuantity}
                                className="px-3 py-2 hover:bg-gray-100"
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        className="w-full mt-6 py-6"
                        size="lg"
                        variant={"primary"}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}
