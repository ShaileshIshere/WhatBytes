"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { fetchCategories } from "@/lib/data"

export default function Sidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true)
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getCategories()
  }, [])

  useEffect(() => {
    // Initialize filters from URL params only once
    if (!isInitialized) {
      const categoryParam = searchParams.get("category")
      if (categoryParam) {
        setSelectedCategories([categoryParam])
      }

      const priceParam = searchParams.get("price")
      if (priceParam) {
        const [min, max] = priceParam.split("-").map(Number)
        setPriceRange([min, max || 1000])
      }

      setIsInitialized(true)
    }
  }, [searchParams, isInitialized])

  const updateFilters = useCallback(() => {
    // Only update if component is initialized to prevent initial render issues
    if (!isInitialized) return

    const params = new URLSearchParams(searchParams.toString())

    // Update category filter
    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0])
    } else {
      params.delete("category")
    }

    // Update price filter
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      params.set("price", `${priceRange[0]}-${priceRange[1]}`)
    } else {
      params.delete("price")
    }

    // Preserve search query if exists
    const search = searchParams.get("search")
    if (search) {
      params.set("search", search)
    }

    const newUrl = `/?${params.toString()}`
    const currentUrl = `/?${searchParams.toString()}`

    // Only navigate if URL actually changed
    if (newUrl !== currentUrl) {
      router.push(newUrl)
    }
  }, [selectedCategories, priceRange, searchParams, router, isInitialized])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([category])
    } else {
      setSelectedCategories([])
    }
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  // Update filters when dependencies change, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      const timeoutId = setTimeout(() => {
        updateFilters()
      }, 300) // Debounce the updates

      return () => clearTimeout(timeoutId)
    }
  }, [updateFilters, isInitialized])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Categories</h3>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-2 animate-pulse">
                <div className="h-4 w-4 rounded bg-gray-200"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm capitalize cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="px-2">
          <Slider value={priceRange} min={0} max={1000} step={10} onValueChange={handlePriceChange} className="mb-6" />
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
