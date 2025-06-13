"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const query = searchParams.get("search")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      const params = new URLSearchParams(searchParams.toString())

      if (searchQuery.trim()) {
        params.set("search", searchQuery.trim())
      } else {
        params.delete("search")
      }

      const newUrl = `/?${params.toString()}`
      const currentUrl = `/?${searchParams.toString()}`

      // Only navigate if URL actually changed
      if (newUrl !== currentUrl) {
        router.push(newUrl)
      }
    },
    [searchQuery, searchParams, router],
  )

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 w-full"
      />
    </form>
  )
}
