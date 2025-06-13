"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { SearchInput } from "./SearchInput"

export default function Header() {
  const { cart } = useCartStore()
  const [mounted, setMounted] = useState(false)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setTotalItems(cart.reduce((sum, item) => sum + item.quantity, 0))
    }
  }, [cart, mounted])

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-32">
              <Image
                src="/placeholder.svg?height=32&width=128"
                alt="Whatbytes Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <Suspense fallback={null}>
              <SearchInput />
            </Suspense>
          </div>

          {/* Cart and Profile */}
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Avatar>
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
