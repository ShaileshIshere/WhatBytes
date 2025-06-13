"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"
import ProductCard from "@/components/ProductCard"
import { fetchProducts } from "@/lib/data"

interface ProductGridProps {
  categoryFilter?: string
  priceFilter?: string
  searchQuery?: string
}

export default function ProductGrid({ categoryFilter, priceFilter, searchQuery }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Apply category filter
    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    // Apply price filter
    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number)
      filtered = filtered.filter((product) => product.price >= min && (max ? product.price <= max : true))
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) => product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    setFilteredProducts(filtered)
  }, [products, categoryFilter, priceFilter, searchQuery])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4 animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-md mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-medium mb-2">No products found</h2>
        <p className="text-gray-500">Try adjusting your filters or search query to find what you&apos;re looking for.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
